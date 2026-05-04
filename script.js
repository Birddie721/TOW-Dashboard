const MOUNT_TO_UNIT_MAP = {
		"boar chariot": "orc boar chariot",
		"wolf chariot": "goblin wolf chariot"
	};
	
	const TROOP_TYPE_NAMES = {
		"RI": "Regular Infantry",
		"HI": "Heavy Infantry",
		"MI": "Monstrous Infantry",
		"Sw": "Swarm",
		"LCa": "Light Cavalry",
		"HCa": "Heavy Cavalry",
		"MCa": "Monstrous Cavalry",
		"WB": "War Beast",
		"MCr": "Monstrous Creature",
		"Be": "Behemoth",
		"WM": "War Machine",
		"LCh": "Light Chariot",
		"HCh": "Heavy Chariot"
	};

	const STRENGTH_MULTIPLIERS = {
		"RI": 1,
		"HI": 1,
		"MI": 3,
		"Sw": 3,
		"LCa": 2,
		"HCa": 2,
		"MCa": 3,
		"WB": 1,
		"LCh": 3,
		"HCh": 5
	};
	
	const RANK_AND_FILE_TYPES = ["RI", "HI", "MI", "LCa", "HCa", "MCa", "Sw", "WB"];

    const fileInput = document.getElementById('fileInput');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const RULES_URL = "https://raw.githubusercontent.com/nthiebes/old-world-builder/refs/heads/main/src/components/rules-index/rules-index-export.json";

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async (ev) => {
            try {
                const listData = JSON.parse(ev.target.result);
                await fetchAndDisplay(listData);
            } catch (e) {
                alert("Error: The file you uploaded isn't a valid OWB JSON export.");
            }
        };
        reader.readAsText(file);
    });

    async function fetchAndDisplay(listData) {
        loadingOverlay.style.display = 'flex';
        try {
            const response = await fetch(RULES_URL);
            const rulesMap = await response.json();
            renderUI(listData, rulesMap);
        } catch (e) {
            console.error("Fetch error:", e);
            alert("Could not load the rules index.");
        } finally {
            loadingOverlay.style.display = 'none';
        }
    }

    function calculateTotalPoints(data) {
        let total = 0;
        ['characters', 'core', 'special', 'rare'].forEach(sec => {
            if (data[sec]) {
                data[sec].forEach(unit => {
                    const multiplier = unit.strength || 1;
                    let unitTotal = (unit.points || 0) * multiplier;
                    unit.command?.forEach(c => { if(c.active) unitTotal += (c.points || 0); });
                    const addons = [...(unit.equipment || []), ...(unit.options || [])];
                    addons.forEach(opt => {
                        if (opt.active) {
                            unitTotal += opt.perModel ? (opt.points * multiplier) : opt.points;
                        }
                    });
                    unit.mounts?.forEach(m => { if(m.active) unitTotal += (m.points || 0); });
                    unit.items?.forEach(group => {
                        group.selected?.forEach(item => {
                            unitTotal += (item.points || 0) * (item.amount || 1);
                        });
                        group.magic?.selected?.forEach(item => {
                            unitTotal += (item.points || 0);
                        });
                    });
                    unit.command?.forEach(c => {
                        if (c.active && c.magic?.selected) {
                            c.magic.selected.forEach(m => { unitTotal += (m.points || 0); });
                        }
                    });
                    total += unitTotal;
                });
            }
        });
        return total;
    }

    function calculateArmor(unit) {
        let baseSave = 7;
        let hasShield = false;
        let hasHandWeapon = false;
        let hasGreatWeapon = false;

        const gear = [
            ...(unit.armor || []),
            ...(unit.equipment || []),
            ...(unit.options || [])
        ].filter(i => i.active);

        gear.forEach(item => {
            const n = item.name_en.toLowerCase();
            if (n.includes('+')) baseSave = parseInt(n); 
            if (n.includes("light armour")) baseSave -= 1;
            else if (n.includes("heavy armour")) baseSave -= 2;
            else if (n.includes("full plate")) baseSave -= 3;
            if (n.includes("barding") || n.includes("armoured hide")) baseSave -= 1;
            if (n.includes("shield")) hasShield = true;
            if (n.includes("hand weapon")) hasHandWeapon = true;
            if (n.includes("great weapon") || n.includes("great hammer")) hasGreatWeapon = true;
        });

        const saveShield = Math.max(2, baseSave - (hasShield ? 1 : 0));
        const saveGW = Math.max(2, baseSave);

        if (hasShield && hasGreatWeapon) {
            return { 
                value: `${saveShield}+/${saveGW}+`, 
                canParry: hasShield && hasHandWeapon, 
                note: `<div class="tactical-note">Shield vs Shoot. Combat: ${saveGW}+ (GW) or ${saveShield}+ (HW&S).</div>` 
            };
        }
        return { value: saveShield > 6 ? "-" : saveShield + "+", canParry: hasShield && hasHandWeapon, note: "" };
    }

    function renderUI(data, rulesMap) {
        const container = document.getElementById('unitContainer');
        const metaBox = document.getElementById('armyMeta');
        container.innerHTML = '';
        
        const actualTotal = calculateTotalPoints(data);
        const maxPoints = data.points;
        const isOver = actualTotal > maxPoints;

        metaBox.className = `bg-white p-6 rounded-xl shadow-sm border sticky top-24 transition-all duration-300 ${isOver ? 'points-error-glow' : 'border-slate-200'}`;
        
        metaBox.innerHTML = `
            <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tactical Summary</h3>
            <div class="text-3xl serif-header font-black ${isOver ? 'text-red-600' : 'text-slate-800'}">${actualTotal} pts</div>
            <div class="text-[10px] font-bold uppercase tracking-widest ${isOver ? 'text-red-400' : 'text-slate-400'} mb-4">
                Limit: ${maxPoints} pts ${isOver ? '<br><span class="text-red-600 font-black">[OVER LIMIT]</span>' : ''}
            </div>
            <div class="text-xs uppercase font-bold text-[#b59b6d] tracking-widest">${data.army.replace(/-/g, ' ')}</div>
        `;

        const getRulesHtml = (rawRulesString) => {
    if (!rawRulesString) return "";
    return rawRulesString.split(',').map(r => r.trim()).filter(r => r).map(r => {
        // 1. Clean the raw string of trailing asterisks (e.g., "Aquatic**" -> "Aquatic")
        const cleanR = r.replace(/\*+$/, '');

        // 2. Keep display name mostly as-is (using cleaned version)
        const displayName = cleanR.replace(/\{([^}]*)\}/g, (match, p1) => {
            const capitalized = p1.charAt(0).toUpperCase() + p1.slice(1);
            return `(${capitalized})`;
        });

        // 3. Create the cleanKey for rulesMap lookup
        let cleanKey = cleanR
            .replace(/\(\d+\+?\)/g, '')   
            .replace(/[\{\}\(\)]/g, '')   
            .replace(/\s+/g, ' ')         
            .toLowerCase()
            .trim();

        const genericKey = cleanR.split(/[\{\(]/)[0].toLowerCase().trim();

        // 4. Special Case: Magic Levels
        let manualPath = null;
        if (/^level\s+\d+\s+wizard$/i.test(cleanKey)) {
            manualPath = "magic/levels-of-wizardry";
        }

        // Lookup: Use manualPath if found, otherwise check rulesMap
        const ruleUrl = manualPath || (rulesMap[cleanKey] || rulesMap[genericKey] || {}).url;

        return `
            <button onclick="openRule('${displayName.replace(/'/g, "\\'")}', '${ruleUrl || null}')" 
                class="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-500 hover:text-slate-900 transition shadow-sm whitespace-nowrap">
                ${displayName}
            </button>`;
    }).join('');
};

        const getStatsHtml = (targetEntry, targetName, armorObj, isMount = false, showAll = false) => {
			if (targetName.toLowerCase().includes("oathstone")) return "";
            if (!targetEntry || !targetEntry.stats) return `<div class="text-xs text-red-400 italic">Stats not found for ${targetName}</div>`;
            return targetEntry.stats
				.filter((s, index) => {
            // Always show the first profile (index 0)
            if (index === 0) return true;
            // Show subsequent profiles only if showAll is true
            return showAll;
        })
				.map(s => `
                <div class="mb-3">
                    <div class="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-2">
                        ${s.Name || targetName} ${(!isMount && armorObj.canParry) ? `<span onclick="openRule('Parry', 'troop-types-in-detail/parry')" class="parry-badge">Parry</span>` : ''}
                    </div>
                    <div class="stat-grid">
                        ${['M','WS','BS','S','T','W','I','A','Ld'].map(k => `
                            <div class="stat-box"><span class="stat-label">${k}</span><span class="stat-val">${s[k] || '-'}</span></div>
                        `).join('')}
                        <div class="stat-box bg-blue-50/50"><span class="stat-label text-blue-400">SV</span><span class="stat-val text-blue-700">${isMount ? '-' : armorObj.value}</span></div>
                    </div>
                </div>
            `).join('');
        };

        ['characters', 'core', 'special', 'rare'].forEach(sec => {
            if (!data[sec] || data[sec].length === 0) return;
            const sectionDiv = document.createElement('div');
            sectionDiv.className = "section-divider";
            sectionDiv.innerHTML = `<div class="section-line"></div><h3>${sec}</h3><div class="section-line"></div>`;
            container.appendChild(sectionDiv);

            data[sec].forEach(unit => {
                const rawName = unit.name_en || unit.name;
                const displayName = rawName.replace(/\{[^}]*\}/g, '').split('.')[0].trim();
                
                let lookupKey = rawName.toLowerCase()
                                .replace(/\{|\}/g, '') // remove {en} etc
                                .replace(/[\(\)]/g, '')     // remove parentheses for Cannon (Dwarfs) -> Cannon Dwarfs
                                .replace(/\s+/g, ' ')      // normalize spaces
                                .trim();

                let entry = rulesMap[lookupKey];
                
                if (!entry) {
                   const fallbacks = [
                       lookupKey.replace(/s$/, ''), // try singular
                       displayName.toLowerCase(),   // try shortened name
                       `${displayName.toLowerCase()} dwarfs` // manual suffix
                   ];
                   for (let fb of fallbacks) {
                       if (rulesMap[fb]) {
                           entry = rulesMap[fb];
                           break;
                       }
                   }
                }
				
				const troopTypeCode = entry ? entry.troopType : null;
				const troopTypeName = TROOP_TYPE_NAMES[troopTypeCode] || troopTypeCode || "Unknown Type";
				
				const isRankAndFile = RANK_AND_FILE_TYPES.includes(troopTypeCode);
				
				

                let mountEntry = null;
                let mountName = "";
                let finalMountRules = "";

                if (unit.mounts && Array.isArray(unit.mounts)) {
                    const selectedMount = unit.mounts.find(m => m.active === true);
                    if (selectedMount && !selectedMount.name_en.toLowerCase().includes("on foot")) {
                        mountName = selectedMount.name_en.replace(/\{([^}]*)\}/g, '$1').split('.')[0].trim();
                        const mountKey = mountName.toLowerCase().trim();
                        mountEntry = rulesMap[mountKey];
						if (!mountEntry && MOUNT_TO_UNIT_MAP[mountKey]) {
							const mappedKey = MOUNT_TO_UNIT_MAP[mountKey];
							mountEntry = rulesMap[mappedKey];
						}
                        const patch = MOUNT_PATCHES[mountKey];
                        if (patch) {
                            finalMountRules = patch.rules;
                        } else if (mountEntry) {
                            finalMountRules = mountEntry.specialRules?.name_en || mountEntry.specialRules || "";
                        }
                    }
                }

                const activeCommand = (unit.command || []).filter(c => c.active);
				const isChampion = activeCommand.some(c => {
					const name = c.name_en.toLowerCase();
					return !name.includes("musician") && !name.includes("standard bearer");
				});
                const commandList = activeCommand.map(c => c.name_en).join(", ");
                const armor = calculateArmor(unit);
                const equip = [...(unit.equipment||[]), ...(unit.armor||[]), ...(unit.options||[])].filter(i => i.active).map(i => i.name_en).join(", ");

                let magicItemsList = [];
                if (unit.items && Array.isArray(unit.items)) {
                    unit.items.forEach(cat => { 
                        if (cat.selected) magicItemsList = [...magicItemsList, ...cat.selected]; 
                    });
                }
                unit.command?.forEach(c => {
                    if (c.active && c.magic && c.magic.selected) {
                        magicItemsList = [...magicItemsList, ...c.magic.selected];
                    }
                });

                const magicHtml = magicItemsList.map(item => {
                    const itemKey = item.name.toLowerCase().trim();
                    const itemUrl = rulesMap[itemKey] ? rulesMap[itemKey].url : `magic-item/${itemKey.replace(/\s+/g, '-')}`;
                    return `<button onclick="openRule('${item.name_en || item.name}', '${itemUrl}')" class="underline decoration-dotted hover:text-[#b59b6d] font-bold">${item.name_en || item.name}</button>`;
                }).join(', ');
				
				const showFullProfiles = !isRankAndFile || activeCommand.some(c => {
					const name = c.name_en.toLowerCase();
					return !name.includes("musician") && !name.includes("standard bearer");
				});

                const unitStatsHtml = getStatsHtml(entry, displayName, armor, false, showFullProfiles);
				const mainMonsterWeapons = getMonsterWeaponsHtml(displayName);
				
				let rulesArray = [unit.specialRules?.name_en || ""];
				
				


				if (unit.options) {
					unit.options.forEach(opt => {
						// Check if the top-level option is active (e.g., Mark of Chaos)
						if (opt.active) {
							// Check for sub-options (this is where Mark of Khorne lives)
							if (opt.options) {
								opt.options.forEach(subOpt => {
									if (subOpt.active) rulesArray.push(subOpt.name_en);
								});
							} else {
								// If there are no sub-options, just add the name if it's active
								rulesArray.push(opt.name_en);
							}
						}
					});
				}

				// 3. Clean up the array and join into a string for the existing helper
				const combinedRulesString = rulesArray.filter(r => r).join(', ');
                const unitRulesHtml = getRulesHtml(combinedRulesString);
                
                let mountBlockHtml = "";
                if (mountEntry) {
					const mountRulesHtml = getRulesHtml(finalMountRules);
					// We pass 'true' as the last argument to show all profiles (Pallid Handmaidens, Spirit Host, etc.)
					const mountStatsContent = getStatsHtml(mountEntry, mountName, armor, true, true);
    
					// We also check the base mount name for weapons (e.g., "Arachnarok Spider")
					const baseMountWeapons = getMonsterWeaponsHtml(mountName);

					mountBlockHtml = `
						<div class="mt-4 pt-4 border-t-2 border-dashed border-slate-200">
							<div class="text-[10px] font-bold text-[#b59b6d] uppercase mb-2 tracking-widest">Mount: ${mountName}</div>
							${mountStatsContent}
							<div class="flex flex-wrap gap-1 mt-2">${mountRulesHtml}</div>
							${baseMountWeapons}
						</div>`;
				}

                const multiplier = unit.strength || 1;
                let unitTotalPoints = (unit.points || 0) * multiplier;
                unit.command?.forEach(c => { if(c.active) unitTotalPoints += (c.points || 0); });
                const addons = [...(unit.equipment || []), ...(unit.options || [])];
                addons.forEach(opt => {
                    if (opt.active) {
                        unitTotalPoints += opt.perModel ? (opt.points * multiplier) : opt.points;
                    }
                });
                unit.mounts?.forEach(m => { if(m.active) unitTotalPoints += (m.points || 0); });
                unit.items?.forEach(group => {
                    group.selected?.forEach(item => {
                        unitTotalPoints += (item.points || 0) * (item.amount || 1);
                    });
                    group.magic?.selected?.forEach(item => { unitTotalPoints += (item.points || 0); });
                });
                unit.command?.forEach(c => {
                    if (c.active && c.magic?.selected) {
                        c.magic.selected.forEach(m => { unitTotalPoints += (m.points || 0); });
                    }
                });
				
				const usmultiplier = STRENGTH_MULTIPLIERS[troopTypeCode] || 1;
				if (troopTypeCode === "BE" || troopTypeCode === "MB") {
					const startingWounds = entry?.stats?.[0]?.W;
					usmultiplier = parseInt(startingWounds) || 1; 
				}
				const calculatedUnitStrength = (unit.strength || 1) * usmultiplier;

                const card = document.createElement('div');
                card.className = "unit-card shadow-sm mb-4";
                card.innerHTML = `
                    <div class="unit-header-block">
                        <div>
                            <button onclick="openRule('${displayName}', '${entry ? entry.url : null}')" class="serif-header text-3xl font-black text-slate-800 hover:text-[#b59b6d] text-left leading-none">${displayName}</button>
                            <div class="flex items-center gap-3 mt-1">
                                <div class="text-xs font-bold text-slate-400">${unit.strength || 1} Models</div>
                                <div class="h-3 w-[1px] bg-slate-300"></div>
								<div class="text-xs font-bold text-indigo-500">${troopTypeName}</div>
								<div class="h-3 w-[1px] bg-slate-300"></div>
                                <div class="text-xs font-bold text-slate-600">Unit Strength: ${calculatedUnitStrength}</div>
                                <div class="h-3 w-[1px] bg-slate-300"></div>
                                <div class="text-xs font-black text-[#b59b6d]">${unitTotalPoints} pts</div>
                            </div>
                        </div>
                        <div class="text-right unit-details-row max-w-[50%]">
                            ${commandList ? `<div><strong>Command:</strong> ${commandList}</div>` : ''}
                            <div><strong>Equipment:</strong> ${equip || 'None'}</div>
                            ${magicHtml ? `<div><strong>Magic Items:</strong> ${magicHtml}</div>` : ''}
                        </div>
                    </div>
                    <div>
						${unitStatsHtml}
						<div class="flex flex-wrap gap-1 mt-2">${unitRulesHtml}</div>
						${mainMonsterWeapons} 
					</div>
                    ${mountBlockHtml}
                    ${armor.note ? `<div class="mt-2 text-xs italic text-slate-500">${armor.note}</div>` : ''}
                `;
                container.appendChild(card);
            });
        });
    }

    function openRule(displayName, directPath) {
        document.getElementById('drawerTitle').innerText = displayName;
        document.getElementById('drawerLoader').style.display = 'flex';
        let finalPath = (directPath && directPath !== "null") ? directPath : `special-rules/${displayName.toLowerCase().replace(/\s+/g, '-')}`;
        document.getElementById('ruleFrame').src = "https://tow.whfb.app/" + finalPath.replace(/^\//, ''); 
        document.getElementById('ruleDrawer').classList.add('open');
        document.getElementById('drawerOverlay').classList.add('open');
        document.getElementById('ruleFrame').onload = () => { document.getElementById('drawerLoader').style.display = 'none'; };
    }

    function closeDrawer() { 
        document.getElementById('ruleDrawer').classList.remove('open'); 
        document.getElementById('drawerOverlay').classList.remove('open'); 
        document.getElementById('ruleFrame').src = ""; 
    }
	
	function getMonsterWeaponsHtml(targetName) {
		const lowerName = targetName.toLowerCase().trim();
		const weaponKeys = MONSTERS[lowerName];
    
		if (!weaponKeys) return "";

		const rows = weaponKeys.map(wKey => {
			const stats = MONSTER_ATTACKS[wKey];
			if (!stats) return "";
			return `
				<tr class="border-b border-slate-100 last:border-0 text-[10px]">
					<td class="py-1 font-bold text-slate-700 capitalize">${wKey}</td>
					<td class="py-1 text-center text-slate-500">${stats.R}</td>
					<td class="py-1 text-center font-bold text-slate-700">${stats.S}</td>
					<td class="py-1 text-center text-slate-500">${stats.AP}</td>
					<td class="py-1 text-right italic text-slate-400 leading-tight">${stats.rules || '-'}</td>
				</tr>
			`;
		}).join('');

		return `
			<div class="mt-3 bg-slate-50/50 rounded-lg p-2 border border-slate-100">
				<div class="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Natural Weapons</div>
				<table class="w-full">
					<thead>
						<tr class="text-[9px] text-slate-400 uppercase text-left border-b border-slate-200">
							<th class="pb-1">Weapon</th>
							<th class="pb-1 text-center">R</th>
							<th class="pb-1 text-center">S</th>
							<th class="pb-1 text-center">AP</th>
							<th class="pb-1 text-right">Special Rules</th>
						</tr>
					</thead>
					<tbody>${rows}</tbody>
				</table>
			</div>
		`;
	}