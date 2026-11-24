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
	
	function calculateUnitPoints(unit) {
    const multiplier = unit.strength || 1;
    let unitTotal = (unit.points || 0) * multiplier;

    // Command upgrades & command magic items
    unit.command?.forEach(c => {
    if (!c.active) return;

    unitTotal += (c.points || 0);

    const cmdAddons = [
        ...(c.equipment || []),
        ...(c.armor || []),
        ...(c.options || [])
    ];

    cmdAddons.forEach(opt => {
        if (!opt || !opt.active) return;

        if (Array.isArray(opt.options) && opt.options.length > 0) {
            opt.options.forEach(subOpt => {
                if (subOpt && subOpt.active) {
                    const subCost = subOpt.points || 0;
                    unitTotal += subOpt.perModel ? (subCost * multiplier) : subCost;
                }
            });
        } else {
            const cost = opt.points || 0;
            unitTotal += opt.perModel ? (cost * multiplier) : cost;
        }
    });

    c.items?.forEach(group => {
        group.selected?.forEach(item => {
            unitTotal += (item.points || 0) * (item.amount || 1);
        });
        group.magic?.selected?.forEach(item => {
            unitTotal += (item.points || 0);
        });
    });

    c.magic?.selected?.forEach(m => {
        unitTotal += (m.points || 0);
    });
});

    // Equipment, armor, and options (including nested sub-options)
    const addons = [
        ...(unit.equipment || []),
        ...(unit.armor || []),
        ...(unit.options || [])
    ];

    addons.forEach(opt => {
        const stackCount = opt.stackable ? (opt.stackableCount || 0) : 0;
        const isActive = Boolean(opt.active) || stackCount > 0;
        if (!isActive) return;

        if (Array.isArray(opt.options) && opt.options.length > 0) {
            opt.options.forEach(subOpt => {
                if (subOpt.active) {
                    const subCost = subOpt.points || 0;
                    unitTotal += subOpt.perModel ? (subCost * multiplier) : subCost;
                }
            });
        } else {
            const cost = opt.points || 0;
            if (opt.stackable) {
                unitTotal += cost * stackCount;
            } else {
                unitTotal += opt.perModel ? (cost * multiplier) : cost;
            }
        }
    });

    // Mounts
    unit.mounts?.forEach(m => {
        if (m.active) unitTotal += (m.points || 0);
    });

    // Magic items / gifts / traits
    unit.items?.forEach(group => {
        group.selected?.forEach(item => {
            if (!item) return;
            const qty = item.amount || 1;
            if (item.perModel && unit.strength) {
                const perModelRate = item.perModelPoints ?? item.points ?? 0;
                unitTotal += perModelRate * multiplier * qty;
            } else {
                unitTotal += (item.points || 0) * qty;
            }
        });
        group.magic?.selected?.forEach(item => {
            unitTotal += (item.points || 0);
        });
    });

    return unitTotal;
}

    function calculateTotalPoints(data) {
        let total = 0;
        ['characters', 'core', 'special', 'rare'].forEach(sec => {
            if (data[sec]) {
                data[sec].forEach(unit => {
                    total += calculateUnitPoints(unit);
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
			//console.log(n + " " + unit.specialRules?.name_en);
            if (n.includes('+')) baseSave = parseInt(n); 
            if (n.includes("light armour")) baseSave -= 1;
            else if (n.includes("heavy armour")) baseSave -= 2;
            else if (n.includes("full plate")) baseSave -= 3;
            if (n.includes("barding")) baseSave -= 1;
            if (n.includes("shield")) hasShield = true;
            if (n.includes("hand weapon")) hasHandWeapon = true;
            if (n.includes("great weapon") || n.includes("great hammer")) hasGreatWeapon = true;
        });
		
		const rules = [unit.specialRules?.name_en || ""];
		rules.forEach(item => {
			if (item.includes('armoured hide')) console.log("Armoured Hide Found");
			item.split(',').map(r => r.trim()).filter(r => r).forEach(rule => {
				if (rule.toLowerCase().includes('armoured hide')) {
					const av = rule.match(/\((\d+)\)/);
					const val = av ? Number(av[1]) : 0;
					baseSave -= val;
				}
			});
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
                const commandGear = (unit.command || [])
					.filter(c => c.active)
					.flatMap(c => [
						...(c.equipment || []),
						...(c.armor || []),
						...(c.options || [])
					])
					.filter(i => i && i.active)
					.flatMap(i => {
						if (Array.isArray(i.options) && i.options.length > 0) {
							return i.options.filter(sub => sub && sub.active).map(sub => sub.name_en);
						}
						return [i.name_en];
				})
					.filter(Boolean);

				
				function formatUniqueGearList(names) {
					const seen = new Set();
					const result = [];

					names.forEach(raw => {
						if (!raw) return;
						const display = String(raw).trim();
						if (!display) return;

						// Normalize case, punctuation/spacing, and trailing 's' so "Crossbows" matches "crossbow"
						const key = display
							.toLowerCase()
							.replace(/\{[^}]*\}/g, "")
							.replace(/\s+/g, " ")
							.trim()
							.replace(/s$/, "");

						if (!seen.has(key)) {
							seen.add(key);
							result.push(display);
						}
					});

					return result.join(", ");
}
				const isGearActive = (i) => Boolean(i && i.active) || (Boolean(i && i.stackable) && (i.stackableCount || 0) > 0);

				const unitGear = [
					...(unit.equipment || []),
					...(unit.armor || []),
					...(unit.options || [])
				]
					.filter(isGearActive)
					.map(i => {
						if (!i.name_en) return "";
						return i.stackable ? `${i.name_en} x${i.stackableCount || 0}` : i.name_en;
					})
					.filter(Boolean);

				const equip = formatUniqueGearList([...unitGear, ...commandGear]);

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
					const label = item.name_en || item.name || "";
					const safeLabel = String(label).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
					const itemKey = (item.name || label).toLowerCase().trim();
					const slug = itemKey.replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
					const itemUrl = rulesMap[itemKey] ? rulesMap[itemKey].url : `magic-item/${slug}`;
					return `<button onclick="openRule('${safeLabel}', '${itemUrl}')" class="underline decoration-dotted hover:text-[#b59b6d] font-bold">${label}</button>`;
				}).join(', ');
				
				const showFullProfiles = !isRankAndFile || activeCommand.some(c => {
					const name = c.name_en.toLowerCase();
					return !name.includes("musician") && !name.includes("standard bearer");
				});

                const unitStatsHtml = getStatsHtml(entry, displayName, armor, false, showFullProfiles);
				const mainMonsterWeapons = getMonsterWeaponsHtml(displayName);
				const unitWeaponsHtml = getUnitWeaponsHtml(unit);
				
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
                const unitTotalPoints = calculateUnitPoints(unit);
				
				let usmultiplier = STRENGTH_MULTIPLIERS[troopTypeCode] || 1;
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
						${unitWeaponsHtml}						
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
	
	function normalizeWeaponLookup(rawName) {
    return rawName
        .toLowerCase()
        .replace(/\{[^}]*\}/g, "")
        .replace(/\([^)]*\)/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function isIgnoredWeaponString(name) {
    return (
        name.includes("hand weapon") ||
        name.includes("claws") ||
        name.includes("fangs") ||
        name.includes("appendages") ||
        name.includes("shield") ||
        name.includes("armour") ||
        name.includes("armor") ||
        name.includes("barding")
    );
}

function getWeaponCandidates(rawName) {
    const cleaned = normalizeWeaponLookup(rawName);
    if (!cleaned || isIgnoredWeaponString(cleaned)) return [];

    const candidates = new Set([cleaned]);

    // Handle common plural -> singular forms ("lances" -> "lance", "great weapons" -> "great weapon")
    if (cleaned.endsWith("ies")) {
        candidates.add(cleaned.slice(0, -3) + "y");
    } else if (cleaned.endsWith("es")) {
        candidates.add(cleaned.slice(0, -2));
        candidates.add(cleaned.slice(0, -1));
    } else if (cleaned.endsWith("s")) {
        candidates.add(cleaned.slice(0, -1));
    }

    // Also try singularizing individual words (e.g., "great weapons" -> "great weapon")
    const singularWords = cleaned
        .split(" ")
        .map(word => (word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word))
        .join(" ");
    candidates.add(singularWords);

    return Array.from(candidates);
}

function getUnitWeaponsHtml(unit) {
    if (typeof WEAPONS === "undefined" || !WEAPONS) return "";
	const commandSources = (unit.command || [])
		.filter(c => c && c.active)
		.flatMap(c => [
			...(c.equipment || []),
			...(c.armor || []),
			...(c.options || [])
		]);
    const isWeaponSourceActive = (item) =>
		Boolean(item && item.active) || (Boolean(item && item.stackable) && (item.stackableCount || 0) > 0);

	const activeSources = [
		...(unit.equipment || []),
		...(unit.armor || []),
		...(unit.options || []),
		...commandSources
	].filter(isWeaponSourceActive);

    const rawEntries = [];
    activeSources.forEach(item => {
        if (Array.isArray(item.options) && item.options.length > 0) {
            item.options.forEach(sub => {
                if (sub && sub.active && sub.name_en) {
                    rawEntries.push(sub.name_en);
                }
            });
        } else if (item.name_en) {
            rawEntries.push(item.name_en);
        }
    });

    const matchedWeapons = new Map();

    rawEntries.forEach(entry => {
        // Split combined strings like "Lances, Shields"
        entry.split(",").forEach(part => {
            const candidates = getWeaponCandidates(part);
            for (const key of candidates) {
                if (WEAPONS[key]) {
                    matchedWeapons.set(key, WEAPONS[key]);
                    break;
                }
            }
        });
    });

    if (matchedWeapons.size === 0) return "";

    const rows = Array.from(matchedWeapons.values()).map(w => `
    <tr class="border-b border-slate-100 last:border-0 text-[10px] align-top">
        <td class="py-1.5 pr-2 font-bold text-slate-700 break-words">${w.name}</td>
        <td class="py-1.5 px-1 text-center text-slate-500 whitespace-nowrap">${w.R}</td>
        <td class="py-1.5 px-1 text-center font-bold text-slate-700 whitespace-nowrap">${w.S}</td>
        <td class="py-1.5 px-1 text-center text-slate-500 whitespace-nowrap">${w.AP}</td>
        <td class="py-1.5 pl-2 text-right italic text-slate-400 leading-tight break-words">${w.rules || "-"}</td>
    </tr>
`).join("");

    return `
        <div class="mt-3 bg-slate-50/50 rounded-lg p-2 border border-slate-100">
            <div class="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Weapon Profiles</div>
            <table class="w-full table-fixed">
                <thead>
                    <tr class="text-[9px] text-slate-400 uppercase text-left border-b border-slate-200">
                        <th class="pb-1 w-28">Weapon</th>
						<th class="pb-1 w-16 text-center">R</th>
						<th class="pb-1 w-14 text-center">S</th>
						<th class="pb-1 w-14 text-center">AP</th>
						<th class="pb-1 text-right">Special Rules</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}