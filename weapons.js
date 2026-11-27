const WEAPONS = {
	"additional hand weapon": {
        name: "Additional Hand Weapons",
        R: "Combat",
        S: "S",
        AP: "-",
        rules: "Extra Attacks (+1), Requires Two Hands"
    },
	"flail": {
        name: "Flail",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Armour Bane (1), Requires Two Hands. Strength bonus and Armour Bane (1) apply only against enemy models charged this turn."
    },
	"great weapon": {
        name: "Great Weapon",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Armour Bane (1), Requires Two Hands, Strike Last."
    },
	"halberd": {
        name: "Halberd",
        R: "Combat",
        S: "S+1",
        AP: "-1 (-2)",
        rules: "Armour Bane (1), Requires Two Hands. AP is -2 against enemy models charged this turn."
    },
	"morning star": {
        name: "Morning Star",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Strength bonus and Armour Bane (1) apply only against enemy models charged this turn."
    },
	"whip": {
        name: "Whip",
        R: "Combat",
        S: "S",
        AP: "-",
        rules: "Fight in Extra Rank, Strike First"
    },
	"lance": {
        name: "Lance",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Armour Bane (1). Usable only when charging; modifiers apply only against enemy models charged this turn."
    },
    "cavalry spear": {
        name: "Cavalry Spear",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Fight in Extra Rank. Cavalry, Monsters, & Chariots only. S/AP bonuses apply only when charging."
    },
	"throwing spear": {
        name: "Throwing Spear",
        R: "Combat",
        S: "S",
        AP: "-",
        rules: "Fight in Extra Rank (on the charge)."
    },
    "thrusting spear": {
        name: "Thrusting Spear",
        R: "Combat",
        S: "S",
        AP: "-",
        rules: "Fight in Extra Rank; +1 Initiative if charged in the front."
    },
	
	"longbow": {
        name: "Longbow",
        R: "30\"",
        S: "3",
        AP: "-",
        rules: "Armour Bane (1), Volley Fire"
    },
	"shortbow": {
        name: "Shortbow",
        R: "18\"",
        S: "3",
        AP: "-",
        rules: "Quick Shot, Volley Fire"
    },
	"warbow": {
        name: "Warbow",
        R: "24\"",
        S: "S",
        AP: "-",
        rules: "Volley Fire"
    },
	"handgun": {
        name: "Handgun",
        R: "24\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (1), Ponderous"
    },
	"pistol": {
        name: "Pistol",
        R: "12\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (1), Quick Shot"
    },
	"brace of pistols": {
        name: "Brace of Pistols",
		profiles: [
			{
				mode: "Ranged",
				R: "12\"",
				S: "4",
				AP: "-1",
				rules: "Armour Bane (1), Multiple Shots (2), Quick Shot"
			},
			{
				mode: "Combat",
				R: "Combat",
				S: "S",
				AP: "-",
				rules: "Extra Attacks (+1), Requires Two Hands"
			}
		]
    },
	"repeater handgun": {
        name: "Repeater Handgun",
        R: "24\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (1), Multiple Shots (3), Ponderous"
    },
	"repeater pistol": {
        name: "Repeater Pistol",
        R: "12\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (1), Multiple Shots (3), Quick Shot"
    },
	"crossbow": {
        name: "Crossbow",
        R: "30\"",
        S: "4",
        AP: "-",
        rules: "Armour Bane (2), Ponderous"
    },
	"repeater crossbow": {
        name: "Repeater Crossbow",
        R: "24\"",
        S: "4",
        AP: "-",
        rules: "Armour Bane (1), Multiple Shots (2)"
    },
	"repeater handbow": {
        name: "Repeater Handbow",
        R: "12\"",
        S: "3",
        AP: "-",
        rules: "Multiple Shots (2), Quick Shot"
    },
	"brace of repeater handbows": {
        name: "Brace of Repeater Handbows",
        R: "12\"",
        S: "3",
        AP: "-",
        rules: "Multiple Shots (4), Quick Shot"
    },
	"throwing weapon": {
        name: "Throwing Weapon",
        R: "9\"",
        S: "S",
        AP: "-",
        rules: "Multiple Shots (2), Move & Shoot, Quick Shot"
    },
	"javelin": {
        name: "Javelin",
        R: "12\"",
        S: "S",
        AP: "-",
        rules: "Move & Shoot, Quick Shot"
    },
	"sling": {
        name: "Sling",
        R: "18\"",
        S: "3",
        AP: "-",
        rules: "Multiple Shots (2)"
    },
    "throwing axe": {
        name: "Throwing Axe",
        R: "9\"",
        S: "S+1",
        AP: "-",
        rules: "Quick Shot"
    },
	
	//Dwarfs
	"great hammer": {
        name: "Great Hammer",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Armour Bane (2), Magical Attacks, Requires Two Hands"
    },
	"brace of drakefire pistols": {
        name: "Brace of Drakefire Pistols",
		profiles: [
			{
				mode: "Ranged",
				R: "12\"",
				S: "5",
				AP: "-1",
				rules: "Armour Bane (2), Dwarf Crafted, Flaming Attacks, Multiple Shots (2), Quick Shot"
			},
			{
				mode: "Combat",
				R: "Combat",
				S: "S",
				AP: "-",
				rules: "Extra Attacks (1), Flaming Attacks, Requires Two Hands"
			}
		]
    },
	"drakegun": {
        name: "Drakegun",
        R: "18\"",
        S: "5",
        AP: "-1",
        rules: "Armour Bane (2), Dwarf Crafted, Flaming Attacks, Quick Shot"
    },
	"cinderblast bombs": {
        name: "Cinderblast Bombs",
        R: "8\"",
        S: "5",
        AP: "-1",
        rules: "Flaming Attacks, Quick Shot. A unit hit suffers D6+1 hits (rather than the usual 1)."
    },
	"trollhammer torpedo": {
        name: "Trollhammer Torpedo",
        R: "24\"",
        S: "5",
        AP: "-3",
        rules: "Cumbersome, Flaming Attacks, Multiple Wounds (D3)"
    },
    "blasting charges": {
        name: "Blasting Charges",
        R: "6\"",
        S: "3",
        AP: "-1",
        rules: "Armour Bane (1), Flaming Attacks, Quick Shot"
    },
	"steam drill": {
        name: "Steam Drill",
        R: "Combat",
        S: "S+3",
        AP: "-3",
        rules: "Furious Charge, Requires Two Hands, Strike Last. A unit of Miners held in reserve that may re-roll the D6 when rolling to determine if they arrive on the battlefield."
    },
	"steam gun": {//dwarfs
        name: "Steam Gun",
        R: "N/A",
        S: "3",
        AP: "-1",
        rules: "Breath Weapon"
    },
	"brimstone gun": {
        name: "Brimstone Gun",
        R: "18\"",
        S: "5",
        AP: "-2",
        rules: "Dwarf Crafted, Flaming Attacks, Multiple Shots (D3+1), Quick Shot"
    },
	"clattergun": {
        name: "Clattergun",
        R: "24\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (1), Dwarf Crafted, Move & Shoot, Multiple Shots (D6), Quick Shot"
    },
	"master rune of flight": {
        name: "Master Rune of Flight",
        R: "12\"",
        S: "S",
        AP: "-",
        rules: "Magical Attacks, Move & Shoot, Quick Shot"
    },
	//Dwarfen Mountain Holds Arcane Journal
	"grudge-settler": {
        name: "Grudge-Settler",
        R: "Combat",
        S: "S+2",
        AP: "-1",
        rules: "Armour Bane (1), Magical Attacks, Multiple Wounds (D6). Any enemy model that directs its attacks against a model wielding the Grudge-Settler during the Combat phase suffers a -1 modifier to its rolls To Hit."
    },
	"the axe of dargo": {
        name: "The Axe of Dargo",
        R: "Combat",
        S: "S+2",
        AP: "-3",
        rules: "Magical Attacks, Monster Slayer"
    },
	"furnace hammer": {
        name: "Furnace Hammer",
        R: "Combat",
        S: "*",
        AP: "-2",
        rules: "Flaming Attacks. Before Burlock makes any attacks with this weapon, roll an Artillery dice to determine its Strength characteristic. If a 'Misfire' is rolled, Burlock loses a single Wound and makes no attacks this turn."
    },
	"rivet gun": {
        name: "Rivet Gun",
        R: "10\"",
        S: "3",
        AP: "-2",
        rules: "Armour Bane (1). If the roll To Hit is successful, this weapon causes D3 hits to the target enemy unit, rather than the usual one hit."
    },
	"gromril great axe": {
        name: "Gromril Great Axe",
        R: "Combat",
        S: "S+2",
        AP: "-3",
        rules: "Requires Two Hands, Strike Last"
    },
	"goblin hewer": {
        name: "Goblin Hewer",
        R: "36\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (1), Cumbersome, Move or Shoot, Whirling Doom"
    },
	
	//Empire
	"steam cannon": {
        name: "Steam Cannon",
        R: "24\"",
        S: "8",
        AP: "-2",
        rules: "Armour Bane (2), Cannon Fire, Cumbersome, Multiple Wounds (D3). If a misfire is rolled, this model loses a single Wound (instead of rolling on the Misfire table)."
    },
	"steam gun": {//Empire
        name: "Steam Gun",
        R: "N/A",
        S: "2",
        AP: "N/A",
        rules: "Breath Weapon. No armour save is permitted against wounds caused by this weapon (Ward and Regeneration saves may be attempted as normal). This weapon does not have a 360 degree line of sight, it can only shoot into the Steam Tank's front arc."
    },
	"helblaster volley gun": {
        name: "Helblaster Volley Gun",
        R: "24\"",
        S: "5",
        AP: "-1",
        rules: "Armour Bane (2), Cumbersome, Helblaster, Move or Shoot"
    },
	"helstorm rocket battery": {
        name: "Helstorm Rocket Battery",
        R: "12-48\"",
        S: "4",
        AP: "-2",
        rules: "Cumbersome, Helstorm, Move or Shoot"
    },
	"runefang": {
        name: "Runefang",
        R: "Combat",
        S: "S",
        AP: "-2",
        rules: "Magical Attacks, Strike First. When making a roll To Wound for a hit caused with a Runefang, a roll of 2+ is always a success, regardless of the target's Toughness."
    },
	"mace of helsturm": {
        name: "Mace of Helsturm",
		profiles: [
			{
				mode: "Single-handed",
				R: "Combat",
				S: "S",
				AP: "-",
				rules: "Magical Attacks"
			},
			{
				mode: "Double-handed",
				R: "Combat",
				S: "10",
				AP: "-5",
				rules: "Magical Attacks, Multiple Wounds (D6), Requires Two Hands. If used double-handed, the wielder may make only one attack, regardless of their Attacks characteristic."
			}
		]
    },
	"sword of justice": {
        name: "Sword of Justice",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Armour Bane (1), Magical Attacks, Multiple Wounds (2). The wielder of the Sword of Justice may re-roll any failed rolls To Wound."
    },
	"dragon bow": {
        name: "Dragon Bow",
        R: "36\"",
        S: "6",
        AP: "-2",
        rules: "Magical Attacks, Multiple Wounds (2)"
    },
	"grenade launching blunderbuss": {
        name: "Grenade Launching Blunderbuss",
        R: "24\"",
        S: "4",
        AP: "-2",
        rules: "Cumbersome, Ponderous. If the roll To Hit is successful, a grenade launching blunderbuss causes D3+1 hits to the target enemy unit, rather than the usual one hit."
    },
	"hochland long rifle": {
        name: "Hochland Long Rifle",
        R: "36\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (1), Cumbersome, Ponderous. A model armed with a Hochland long rifle can target a specific model within its target unit, such as a champion or a character."
    },
	//Empire of Man Arcane Journal
	"beast reaver": {
        name: "Beast Reaver",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Armour Bane (1), Killing Blow, Magical Attacks. When making attacks against Beatmen Brayherds, Harald Gemunsen may re-roll any failed rolls To Wound."
    },
	"judgement": {
        name: "Judgement",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Magical Attacks, Multiple Wounds (2), Requires Two Hands"
    },
	"wolf hammer": {
        name: "Wolf Hammer",
        R: "Combat",
        S: "S+1",
        AP: "-2",
        rules: "Requires Two Hands. If the wielder of a wolf hammer uses it during a turn in which they made a charge move of 3 inches or more, they have a 2+ modifier to their Strength characteristic, rather than the usual +1."
    },
	"light cannon": {
        name: "Light Cannon",
        R: "18\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (2). If the roll To Hit is successful when firing a light cannon, it causes D3 hits to the target enemy unit, rather than the usual one."
    },
	"ogre pistol": {
        name: "Ogre Pistol",
        R: "24\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (1), Quick Shot"
    },
	"blunderbuss": {
        name: "Blunderbuss",
        R: "12\"",
        S: "3",
        AP: "-1",
        rules: "Multiple Shots (D3), Volley Fire"
    },
	"long rifle": {
        name: "Long Rifle",
        R: "36\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (1), Cumbersome"
    },
	"repeating rifle": {
        name: "Repeating Rifle",
        R: "24\"",
        S: "4",
        AP: "-1",
        rules: "Armour Bane (1), Multiple Shots (3)"
    },
	"ball & chain": {
        name: "Ball & Chain",
        R: "Combat",
        S: "S+3",
        AP: "-2",
        rules: "Armour Bane (1), Requires Two Hands, Strikes Last"
    },
	"hooked halberd": {
        name: "Hooked Halberd",
        R: "Combat",
        S: "S+1",
        AP: "-2",
        rules: "Armour Bane (2), Requires Two Hands"
    },
	"man-catcher": {
        name: "Man-catcher",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Killing Blow, Requires Two Hands"
    },
	"hammer of righteousness": {
        name: "Hammer of Righteousness",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Magical Attacks, Requires Two Hands, Strikes Last. Models hit by the Hammer of Righteousness must make a Leadership test for each hit suffered. If the test is failed, the hit wounds automatically and no Armour save is allowed (Regeneration and Ward saves may be taken as normal). If the test is passed, rolls To Wound and Armour Saves are made as normal."
    },
	"pearl daggers": {
        name: "Pearl Daggers",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Extra Attacks (D3), Magical Attacks, Requires Two Hands. The wielder of the Pearl Daggers may re-roll any failed rolls To Hit during the Combat phase."
    },
	"blade of silvered steel": {
        name: "Blade of Silvered Steel",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Hatred (Undead models), Magical Attacks. Undead models cannot make Armour or Regeneration saves against a wound caused by this weapon."
    },
	"von trickschotte's wondrous arquebus": {
        name: "Von Trickschotte's Wondrous Arquebus",
        R: "36\"",
        S: "5",
        AP: "-2",
        rules: "Armour Bane (1), Magical Attacks, Multiple Wounds (D3). The wielder of this weapon does not suffer the usual -1 modifier for shooting at long range."
    },
	
	//Bretonnia
	"polearm": {
        name: "Polearm",
		profiles: [
			{
				mode: "Single-handed",
				R: "Combat",
				S: "S",
				AP: "-",
				rules: "Fight in Extra Rank. A model wielding a polearm cannot make a supporting attack during a turn in which it charged."
			},
			{
				mode: "Double-handed",
				R: "Combat",
				S: "S+1",
				AP: "-1",
				rules: "Requires Two Hands"
			}
		]
    },
	"sword of the quest": {
        name: "Sword of the Quest",
		profiles: [
			{
				mode: "Single-handed",
				R: "Combat",
				S: "S+1",
				AP: "-1",
				rules: "Magical Attacks, Strike First"
			},
			{
				mode: "Double-handed",
				R: "Combat",
				S: "S+2",
				AP: "-2",
				rules: "Magical Attacks, Multiple Wounds (2), Requires Two Hands, Strike Last"
			}
		]
    },
	"sword of heroes": {
        name: "Sword of Heroes",
        R: "Combat",
        S: "S",
        AP: "-",
        rules: "Magical Attacks, Monster Slayer. When making a roll To Wound for a hit caused with the Sword of Heroes, a roll of 5+ is always a success, regardless of the target's Toughness."
    },
	"heartwood lance": {
        name: "Heartwood Lance",
        R: "Combat",
        S: "S+3",
        AP: "-3",
        rules: "Magical Attacks. The Heartwood Lance can only be used during a turn in which the wielder charged."
    },
	"morning star of fracasse": {
        name: "Morning Star of Fracasse",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Magical Attacks. Any magic weapon carried by an enemy model that suffers one or more unsaved wounds from the Morning Star of Fracasse is destroyed and cannot be used for the remainder of the game."
    },
	//Kingdom of Bretonnia Arcane Journal
	"the dolorous blade": {
        name: "The Dolorous Blade",
		profiles: [
			{
				mode: "Rapid Strikes",
				R: "Combat",
				S: "S",
				AP: "-1",
				rules: "Extra Attacks (D6), Magical Attacks"
			},
			{
				mode: "Deadly Blows",
				R: "Combat",
				S: "S+2",
				AP: "-1",
				rules: "Armour Bane (1), Magical Attacks, Multiple Wounds (2)"
			}
		]
    },
	"sorrow's end": {
        name: "Sorrow's End",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Magical Attacks, Monster Slayer, Multiple Wounds (2)"
    },
	"bombard": {
        name: "Bombard",
        R: "48\"",
        S: "8",
        AP: "-3",
        rules: "Armour Bane (2), Cannon Fire, Cumbersome, Move or Shoot, Multiple Wounds (D3+1)"
    },
	"crusader's lance": {
        name: "Crusader's Lance",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Armour Bane (2), Furious Charge, Hatred (all enemies), Magical Attacks. The Crusader's Lance can only be used during a turn in which the wielder charged."
    },
	"frontier axe": {
        name: "Frontier Axe",
        R: "Combat",
        S: "S+2",
        AP: "-3",
        rules: "Magical Attacks, Multiple Wounds (2), Requires Two Hands"
    },
	"sword of the stout hearted": {
        name: "Sword of the Stout Hearted",
        R: "Combat",
        S: "S+2",
        AP: "-1",
        rules: "Armour Bane (1), Immune to Psychology, Magical Attacks, Requires Two Hands"
    },
	"foebreaker": {
        name: "Foebreaker",
        R: "Combat",
        S: "S+1",
        AP: "-",
        rules: "Magical Attacks. Any enemy model that suffers one or more unsaved wounds from the Foebreaker must immediately make a Toughness test. If the test is failed, the wounded model suffers a -1 modifier to its Weapon Skill and Attacks characteristics (to a minimum of 1) until the end of the next Combat phase."
    },
	
	//Wood Elves
	"spear of loec": {
        name: "Spear of Loec",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Armour Bane (2), Killing Blow"
    },
	"trickster's blades": {
        name: "Trickster's Blades",
        R: "Combat",
        S: "S",
        AP: "-",
        rules: "Extra Attacks (+D3), Requires Two Hands"
    },
	"mighty antlers": {
        name: "Mighty Antlers",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Armour Bane (1)"
    },
	"asrai spear": {
        name: "Asrai Spear",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Fight in Extra Rank (if the unit did not charge). During a turn in which it was charged in its front arc, a model wielding an Asrai spear gains a +1 modifier to its Initiative against the charging unit(s)."
    },
	"ranger's glaive": {
        name: "Ranger's Glaive",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Requires Two Hands"
    },
	"blackbriar javelin": {
        name: "Blackbriar Javelin",
        R: "12\"",
        S: "S",
        AP: "-1",
        rules: "Move & Shoot, Quick Shot"
    },
	"hunting spear": {
        name: "Hunting Spear",
        R: "Combat",
        S: "S+1",
        AP: "-2",
        rules: "Armour Bane (1). A hunting spear can only be used during a turn in which the wielder charged."
    },
	"spear of twilight": {
        name: "Spear of Twilight",
        R: "Combat",
        S: "S",
        AP: "-2",
        rules: "Killing Blow, Magical Attacks. When the wielder of the Spear of Twilight makes a roll To Wound, a roll of 3+ is always a success, regardless of the target's Toughness."
    },
	"blades of loec": {
        name: "Blades of Loec",
        R: "Combat",
        S: "S",
        AP: "-",
        rules: "Extra Attacks (+D3), Magical Attacks, Requires Two Hands. The wielder of the Blades of Loec may re-roll any failed rolls To Wound."
    },
	"bow of loren": {
        name: "Bow of Loren",
        R: "32\"",
        S: "S",
        AP: "-",
        rules: "Armour Bane (1), Magical Attacks. The Bow of Loren counts as an Asrai longbow. The wielder of the Bow of Loren may make a number of shooting attacks equal to their Attacks characteristic, rather than the usual one. This model does not suffer any modifiers for firing multiple shots."
    },
	"asyendi's bane": {
        name: "Asyendi's Bane",
        R: "32\"",
        S: "S",
        AP: "-",
        rules: "Armour Bane (1), Magical Attacks, Quick Shot. Asyendi's Bane counts as an Asrai longbow. The wielder of Asyendi's Bane may re-roll a single failed roll To Hit made during the Shooting phase. However, if the re-roll also fails to hit, the wielder suffers a single Strength 3 hit with an AP of -."
    },
	"asrai longbow": {
        name: "Asrai Longbow",
        R: "32\"",
        S: "S",
        AP: "-",
        rules: "Armour Bane (1), Volley Fire"
    },
	//Wood Elf Realms Arcane Journal
	"hawk's talon": {
        name: "Hawk's Talon",
        R: "30\"",
        S: "S",
        AP: "-1",
        rules: "Magical Attacks, Multiple Shots (D3+1)"
    },
	"the spear of kurnous": {
        name: "The Spear of Kurnous",
		profiles: [
			{
				mode: "Ranged",
				R: "18\"",
				S: "S+1",
				AP: "-2",
				rules: "Magical Attacks, Multiple Wounds (D3), Through & Through"
			},
			{
				mode: "Combat",
				R: "Combat",
				S: "S+1",
				AP: "-2",
				rules: "Magical Attacks, Multiple Wounds (D3)"
			}
		]
    },
	"spear of talsyn": {
        name: "Spear of Talsyn",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Armour Bane (1), Magical Attacks"
    },
	"vaul's wrath": {
        name: "Vaul's Wrath",
        R: "32\"",
        S: "S+1",
        AP: "-2",
        rules: "Flaming Attacks, Magical Attacks, Multiple Wounds (2), Through & Through (once per game if wielder didn't move)"
    },
	"daith's reaper": {
        name: "Daith's Reaper",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Magical Attacks. Enemy models must re-roll any successful Armour Save rolls against wounds caused by this weapon."
    },
	"hunt master's pride": {
        name: "Hunt Master's Pride",
        R: "Combat",
        S: "S",
        AP: "-2",
        rules: "Magical Attacks, Multiple Wounds (2). The Multiple Wounds (2) special rule applies only against models whose troop type is 'monstrous infantry', 'monstrous cavalry', 'monstrous creature', or 'behemoth'."
    },
	"blades of endless flame": {
        name: "Blades of Endless Flame",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Extra Attacks (1), Flaming Attacks, Magical Attacks"
    },
	
	//High Elves
	"handmaiden's spear": {
        name: "Handmaiden's Spear",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "During a turn in which it was charged, a model wielding a Handmaiden's spear gains a +1 modifier to its Initiative against the charging unit(s)."
    },
	"eagle-eye bolt thrower": {
        name: "Eagle-Eye Bolt Thrower",
        R: "24\"",
        S: "5",
        AP: "-3",
        rules: "Cumbersome, Multiple Wounds (D3)"
    },
	"the white sword": {
        name: "The White Sword",
        R: "Combat",
        S: "S+3",
        AP: "-2",
        rules: "Magical Attacks, Monster Slayer, Requires Two Hands, Strike Last"
    },
	"the blade of leaping gold": {
        name: "The Blade of Leaping Gold",
        R: "Combat",
        S: "S",
        AP: "-",
        rules: "Armour Bane (2), Extra Attacks (+D3), Magical Attacks"
    },
	"reaver bow": {
        name: "Reaver Bow",
        R: "30\"",
        S: "S+1",
        AP: "-",
        rules: "Magical Attacks. The Reaver Bow counts as a Bow of Avelorn. The wielder of the Reaver Bow may make a number of shooting attacks equal to their Attacks characteristic, rather than the usual one. This model does not suffer any modifiers for firing multiple shots."
    },
	"foe bane": {
        name: "Foe Bane",
        R: "Combat",
        S: "S",
        AP: "-",
        rules: "Magical Attacks. When the wielder of the Foe Bane makes a roll To Wound, a roll of 4+ is always a success, regardless of the target's Toughness."
    },
	"bow of avelorn": {
        name: "Bow of Avelorn",
        R: "30\"",
        S: "S",
        AP: "-",
        rules: "Armour Bane (1), Magical Attacks, Volley Fire"
    },
	"ceremonial halberd": {
        name: "Ceremonial Halberd",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Armour Bane (1), Fight in Extra Rank, Magical Attacks, Requires Two Hands. A model wielding a ceremonial halberd cannot make a supporting attack during a turn in which it charged."
    },
	"chracian great blade": {
        name: "Chracian Great Blade",
        R: "Combat",
        S: "S+2",
        AP: "-3",
        rules: "Requires Two Hands, Strike Last"
    },
	"sword of hoeth": {
        name: "Sword of Hoeth",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Magical Attacks, Requires Two Hands"
    },
	//High Elf Realms Arcane Journal
	"chayal": {
        name: "Chayal",
        R: "Combat",
        S: "S+2",
        AP: "-3",
        rules: "Killing Blow, Requires Two Hands. The wielder of Chayal may re-roll any rolls To Hit of a natural 1 made during the Combat phase."
    },
	"mathlann's ire": {
        name: "Mathlann's Ire",
        R: "Combat",
        S: "S+1",
        AP: "-2",
        rules: "Armour Bane (1), Magical Attacks. During the Combat phase, enemy models must re-roll a single successful roll To Hit made against the wielder of Mathlann's Ire."
    },
	"lashing talons": {
        name: "Lashing Talons",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Armour Bane (1)"
    },
	"serpentine tail": {
        name: "Serpentine Tail",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Strike Last. In combat, this model must make one of its attacks each turn with this weapon."
    },
	"briny breath": {
        name: "Briny Breath",
        R: "N/A",
        S: "2",
        AP: "-2",
        rules: "Breath Weapon. Any enemy unit that suffers one or more unsaved Wounds from this weapon suffers a -1 modifier to their Initiative characteristic until your next Start of Turn sub-phase."
    },
	"woodsman's axe": {
        name: "Woodsman's Axe",
        R: "Combat",
        S: "S+3",
        AP: "-4",
        rules: "Magical Attacks, Monster Slayer, Requires Two Hands, Strike Last"
    },
	"bow of the seafarer": {
        name: "Bow of the Seafarer",
        R: "30\"",
        S: "5",
        AP: "-3",
        rules: "Cumbersome, Magical Attacks, Multiple Wounds (D3), Through & Through. The Bow of the Seafarer counts as a Bow of Avelorn."
    },
	"star lance": {
        name: "Star Lance",
        R: "Combat",
        S: "S+3",
        AP: "-4",
        rules: "Magical Attacks, Strike First. The Star Lance can only be used during a turn in which the wielder charged."
    },
	"blade of sea gold": {
        name: "Blade of Sea Gold",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Magical Attacks, Multiple Wounds (D3)"
    },
	
	//Orcs & Goblins
	"huge gob": {
        name: "Huge Gob",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Armour Bane (1)"
    },
	"troll vomit": {
        name: "Troll Vomit",
        R: "Combat",
        S: "3",
        AP: "-2",
        rules: "A Troll that is in base contact with an enemy model may make one additional attack each turn with this weapon. This attack must be made last, after all other attacks have been made (including Stomp Attacks), but hits automatically."
    },
	"battleaxe of the last big waaagh!": {
        name: "Battleaxe of the Last Big Waaagh!",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Extra Attacks (+D6), Magical Attacks, Requires Two Hands, Strike Last. If a natural 6 is rolled for the Extra Attacks (+D6) special rule, the Battleaxe of the Last Big Waaagh! loses the Extra Attacks (+D6) special rule at the end of the current Combat phase."
    },
	"porko's pigstikka": {
        name: "Porko's Pigstikka",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Armour Bane (1), Magical Attacks. This weapon's Strength and Armour Piercing modifiers apply only during a turn in which the wielder charged. In addition, during a turn in which the wielder charged, Porko's Pigstikka grants them +1 Attack for each rank the enemy unit has."
    },
	"da choppiest choppa": {
        name: "Da Choppiest Choppa",
        R: "Combat",
        S: "S+1",
        AP: "-3",
        rules: "Magical Attacks"
    },
	"wollopa's one hit wunda": {
        name: "Wollopa's One Hit Wunda",
        R: "Combat",
        S: "10",
        AP: "-3",
        rules: "Magical Attacks, Strike First. Once per game, during the first round of combat, the wielder of this weapon can use it with this profile. At all other times, this weapon counts as a hand weapon with the Magical Attacks special rule."
    },
	//Orc & Goblin Tribes Arcane Journal
	"da skull smasha": {
        name: "Da Skull Smasha",
		profiles: [
			{
				mode: "Hammer",
				R: "Combat",
				S: "S+2",
				AP: "-1",
				rules: "Armour Bane (2), Magical Attacks"
			},
			{
				mode: "Pick",
				R: "Combat",
				S: "S",
				AP: "-2",
				rules: "Armour Bane (2), Magical Attacks, Multiple Wounds (2)"
			}
		]
    },
	"bog-wood staff": {
        name: "Bog-wood Staff",
        R: "Combat",
        S: "S+2",
        AP: "-1",
        rules: "Magical Attacks, Requires Two Hands. For each unsaved Wound inflicted with this weapon, Ogdruz may recover a lost Wound."
    },
	"swamp breath": {
        name: "Swamp Breath",
        R: "N/A",
        S: "3",
        AP: "-2",
        rules: "Breath Weapon. Any unit that suffers one or more unsaved wounds from this weapon must make a Panic test as if it had taken heavy casualties."
    },
	"ironfist": {
        name: "Ironfist",
        R: "Combat",
        S: "S",
        AP: "-",
        rules: "Extra Attacks (1), Requires Two Hands. A model equipped with an Ironfist improves its armour value by 1."
    },
	"bigger, choppier axe": {
        name: "Bigger, Choppier Axe",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Killing Blow, Magical Attacks, Requires Two Hands, Strikes Last"
    },
	"martog's best basha": {
        name: "Martog's Best Basha",
        R: "Combat",
        S: "S+1",
        AP: "-2",
        rules: "Magical Attacks, Requires Two Hands. The wielder of this weapon has a +1 modifier to its Weapon Skill and Initiative characteristics."
    },
	"da akrit axe": {
        name: "Da Akrit Axe",
        R: "Combat",
        S: "S+1",
        AP: "-",
        rules: "Armour Bane (1), Magical Attacks. The wielder of Da Akrit Axe may re-roll any failed To Hit made whilst using it. However, this weapon's Strength modifier applies only against enemy models the wielder charged this turn."
    },
	"backstabber's blade": {
        name: "Backstabber's Blade",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Magical Attacks. If the wielder of this weapon is engaged with an enemy's flank arc, it may re-roll any failed rolls To Wound. If the wielder of this weapon is engaged with an enemy's rear arc, it may re-roll any failed rolls To Hit and To Wound."
    },
	
	//Warriors of Chaos
	"doomfire": {
        name: "Doomfire",
        R: "12-60\"",
        S: "5(10)",
        AP: "-2(-5)",
        rules: "Bombardment Cumbersome, Move or Shoot, Multiple Wounds (D3). Any unit that suffers one or more unsaved wounds from this weapon must make a Panic test as if it had taken heavy casualties."
    },
	"daemonsword": {
        name: "Daemonsword",
        R: "Combat",
        S: "S+D3",
        AP: "-2",
        rules: "Extra Attacks (D3), Magical Attacks, Strike First. Every roll of a natural 1 made when rolling To Hit with this weapon results in a hit which must be resolved against the unit the wielder has joined, rather than the enemy. If the wielder has not joined a unit, this hit must be resolved against the wielder."
    },
	"chaos runesword": {
        name: "Chaos Runesword",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Magical Attacks. The wielder of the Chaos Runesword has a +1 modifier to their Weapon Skill and Initiative characteristics."
    },
	"filth mace": {
        name: "Filth Mace",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Magical Attacks. Any enemy model that suffers one or more unsaved wounds from the Filth Mace must immediately make a Toughness test. If this test is failed, the wounded model suffers a -1 modifier to its Toughness characteristic (to a minimum of 1) until the end of the turn."
    },
	"spellthieving sword": {
        name: "Spellthieving Sword",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Magical Attacks. Any enemy Wizard that suffers one or more unsaved wounds from the Spellthieving Sword immediately forgets a single spell (determined at random) for the remainder of the game."
    },
	//Warriors of Chaos Arcane Journal
	"storm's wrath": {
        name: "Storm's Wrath",
        R: "Combat",
        S: "S+2",
        AP: "-1",
        rules: "Extra Attacks (D3), Magical Attacks, Requires Two Hands. Storm's Wrath's Strength modifier applies only against enemy models the wielder charged this turn."
    },
	"obsidian dread-glaive": {
        name: "Obsidian Dread-Glaive",
        R: "Combat",
        S: "S+2",
        AP: "-1",
        rules: "Armour Bane (1), Killing Blow, Magical Attacks, Requires Two Hands, Strikes Last."
    },
	"dagger of the dark pantheon": {
        name: "Dagger of the Dark Pantheon",
        R: "Combat",
        S: "S",
        AP: "-2",
        rules: "Magical Attacks. For each Wound an enemy unit loses as a result of an attack made with the Dagger of the Dark Pantheon, its wielder may apply a +1 modifier to their next Casting or Dispel roll."
    },
	"chieftain's blade": {
        name: "Chieftain's Blade",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Armour Bane (1), Magical Attacks. Whilst engaged in a challenge, the wielder has a +1 modifier to their rolls To Hit."
    },
	"taskmaster's scourge": {
        name: "Taskmaster's Scourge",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Extra Attacks (1), Magical Attacks. During the Command sub-phase of their turn, the wielder of this weapon may attempt to urge those around them into battle with a lash of their whip by making a Leadership test (using their own Leadership). If the test is passed, until your next Start of Turn sub-phase, this character and any unit they have joined gain a +D3 modifier to their Movement characteristic (to a maximum of 10)."
    },
	
	//Beastmen
	"primeval club": {
        name: "Primeval Club",
        R: "Combat",
        S: "*",
        AP: "-3",
        rules: "Hatred (Empire), Magical Attacks, Poisoned Attacks. The Strength characteristic of the Primeval Club is equal to the current Leadership characteristic of the model that wields it."
    },
	"axe of men": {
        name: "Axe of Men",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Killing Blow, Magical Attacks. Should the wielder of the Axe of Men kill an enemy character (including champions) in a challenge, they gain the Terror special rule for the remainder of the game."
    },
	"mangelder": {
        name: "Mangelder",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Magical Attacks, Terror. Any enemy unit that suffers one or more unsaved wounds from the Mangelder suffers a -1 modifier to its Leadership characteristic (to a minimum of 2) until the end of the turn."
    },
	"hunter's spear": {
        name: "Hunter's Spear",
        R: "24\"",
        S: "6",
        AP: "-3",
        rules: "Cumbersome, Magical Attacks, Multiple Wounds (2), Through & Through"
    },
	//Beastmen Breyherds Arcane Journal
	"twisted antlers": {
        name: "Twisted Antlers",
        R: "Combat",
        S: "S",
        AP: "-2",
        rules: "Armour Bane (1)"
    },
	"the black maul": {
        name: "The Black Maul",
        R: "Combat",
        S: "S+2",
        AP: "-3",
        rules: "Extra Attacks (+D6), Magical Attacks. Each time a natural 6 is rolled for the Extra Attacks (+D6) special rule, the wielder of the Black Maul suffers a -1 modifier to their Weapon Skill characteristic (to a minimum of 1, and for the remainder of the game)."
    },
	"the axes of khorgor": {
        name: "The Axes of Khorgor",
        R: "Combat",
        S: "S+1",
        AP: "-2",
        rules: "Extra Attacks (+1), Magical Attacks, Requires Two Hands. The wielder of the Axes of Khorgor may re-roll any rolls To Wound of a natural 1 made during the Combat phase."
    },
	"the brass cleaver": {
        name: "The Brass Cleaver",
        R: "Combat",
        S: "S",
        AP: "-2",
        rules: "Magical Attacks. Enemy models are not permitted an armour, Ward, or Regeneration save against an attack made with this weapon if the wielder rolls a natural 6 when making a roll To Wound."
    },
	"scimitar of Skultar": {
        name: "Scimitar of Skultar",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Armour Bane (1), Magical Attacks, Multiple Wounds (2)"
    },
	
	//Tomb Kings
	"ritual blade": {
        name: "Blade of Sea Gold",
        R: "Combat",
        S: "S+2",
        AP: "-3",
        rules: "Requires Two Hands, Strike Last"
    },
	"greatbow": {
        name: "Greatbow",
        R: "30\"",
        S: "6",
        AP: "-1",
        rules: "Armour Bane (2), Multiple Wounds (2), Volley Fire"
    },
	"screaming skill catapult": {
        name: "Screaming Skull Catapult",
        R: "12-60\"",
        S: "4(8)",
        AP: "-1(-3)",
        rules: "Bombardment, Cumbersome, Flaming Attacks, Magical Attacks, Move or Shoot, Multiple Wounds (D3+1), Screaming Skulls. The Multiple Wounds (D3+1) special rule applies only to a single model whose base lies underneath the central hole of the blast template."
    },
	"destroyer of eternities": {
        name: "Destroyer of Eternities",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Killing Blow, Magical Attacks, Requires Two Hands, Strike Last. Rather than attacking normally, the wielder of the Destroyer of Eternities may choose to make a special 'Scything' attack. If they do so, the enemy unit they are directing their attacks against suffers D6 automatic hits, each resolved using the Destroyer of Eternities' profile."
    },
	"crook & flail of radiance": {
        name: "Crook & Flail of Radiance",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Extra Attacks (+D3), Magical Attacks, Requires Two Hands, Strike First"
    },
	"flail of skulls": {
        name: "Flail of Skulls",
        R: "Combat",
        S: "S+3",
        AP: "-1",
        rules: "Magical Attacks, Multiple Wounds (2), Requires Two Hands. The Flail of Skulls' Strength modifier applies only against enemy models the wielder charged this turn."
    },
	"serpent staff": {
        name: "Serpent Staff",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Magical Attacks, Poisoned Attacks, Requires Two Hands"
    },
	//Tomb Kings of Khemri Arcane Journal
	"the blessed blade of ptra": {
        name: "The Blessed Blade of Ptra",
        R: "Combat",
        S: "S",
        AP: "-3",
        rules: "Flaming Attacks, Magical Attacks, Requires Two Hands. Any enemy model that suffers one or more unsaved wounds from the Blessed Blade of Ptra suffers a -1 modifier to its rolls To Hit, both when shooting and in combat, for the remainder of the game."
    },
	"swarming mass": {
        name: "Swarming Mass",
        R: "N/A",
        S: "2",
        AP: "-",
        rules: "Breath Weapon. When making a roll To Wound with this weapon, a roll of 4+ is always a success, regardless of the target's Toughness."
    },
	"the flail of comquered kings": {
        name: "The Flail of Conquered Kings",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Magical Attacks, Multiple Wounds (2), Requires Two Hands. The Flail of Conquered Kings' Strength modifier applies only against enemy models the wielder charged this turn."
    },
	"blade of antarhak": {
        name: "Blade of Antarhak",
        R: "Combat",
        S: "S+1",
        AP: "-1",
        rules: "Magical Attacks. For each Wound an enemy unit loses as a result of an attack made with the Blade of Antarhak, its wielder immediately recovers a single lost Wound."
    },
	"the conquerer's blade": {
        name: "The Conquerer's Blade",
        R: "Combat",
        S: "S+2",
        AP: "-2",
        rules: "Killing Blow, Magical Attacks, Requires Two Hands, Strike Last. Whilst engaged in a challenge, the bearer of the Conqueror's Blade strikes a Killing Blow if they roll a natural 5 or 6 when making a To Wound roll, rather than the usual 6. In addition, should the wielder slay the enemy General in a challenge, you win a bonus of 100 Victory Points at the end of the game."
    },
	"phakth's blades of justice": {
        name: "Phakth's Blades of Justice",
        R: "Combat",
        S: "S",
        AP: "-1",
        rules: "Magical Attacks, Requires Two Hands. Phakth's Blades of Justice grant the wielder +1 Attack for each rank an enemy unit the wielder is engaged with has."
    },
	"staff of aeons": {
        name: "Staff of Aeons",
        R: "Combat",
        S: "S+2",
        AP: "-1",
        rules: "Magical Attacks, Requires Two Hands. Any model that is hit by one or more close combat attacks made using this weapon suffers a -1 modifier to its armour value for the remainder of the game."
    },
	
};