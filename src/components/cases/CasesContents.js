import React, { useRef, useState } from "react";

const items = {
	simple: {
		skin: "M4A1-S | Cyrex",
		img: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1s_cyrex_light_large.144b4053eb73b4a47f8128ebb0e808d8e28f5b9c.png"
	},
	middle: {
		skin: "M4A1-S | Chantico's Fire",
		img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_UZrMTzwJYSdJlU8N1zY81TrxO_v0MW9uJnBm3Rk7nEk5XfUmEeyhQYMMLIUhCYx0A"
	},
	super: {
		skin: "M4A4 | Asiimov",
		img: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4_asimov_light_large.af03179f3d43ff55b0c3d114c537eac77abdb6cf.png"
	}
};
const CasesContents = () => {
    const raffleRollerContainerRef = useRef(null);
    const inventoryRef = useRef(null);

    const raffleRollerContainer = React.forwardRef((props, ref) => {
        return <div ref={ref} class="raffle-roller-container" style={{marginLeft: "0px"}}></div>
    });

    const inventory = React.forwardRef((props, ref) => {
        return <div ref={ref} class="inventory"></div>
    });

    const [rollResult, setRollResult] = useState("");

    function generate() {
        document.getElementById("").getElementById("")
        raffleRollerContainerRef.current.style.transition = "sdf";
        raffleRollerContainerRef.current.style.marginLeft = "0px";
        raffleRollerContainerRef.current.innerHTML = "";
        for(let i = 0; i < 101; i++) {
            const div = document.createElement("div");
            div.id = `ItemNumber${i}`;
            div.classList.add("items", "class_red_item");
            div.style.backgroundImage = `url(${items.simple.img})`;
            const randint = randomInt(1,1000);
            if(randint < 50) {
                div.style.backgroundImage = `url(${items.super.img})`;
            } else if(500 < randint) {
                div.style.backgroundImage = `url(${items.middle.img})`;
            }
            raffleRollerContainerRef.current.appendChild(div);
        }
        setTimeout(function() {
            const randnum = randomInt(1, 3);
            if(randnum === 2) {
                goRoll(items.middle.skin, items.middle.img);
            } else if(randnum === 1) {
                goRoll(items.super.skin, items.super.img);
            } else {
                goRoll(items.simple.skin, items.simple.img);
            }
        }, 500);
    }

    function goRoll(skin, skinimg) {
        raffleRollerContainerRef.current.style.transition = "all 8s cubic-bezier(.08,.6,0,1)";
        raffleRollerContainerRef.current.getElementById("ItemNumber78").style.backgroundImage = `url(${skinimg})`;
        setTimeout(function() {
            raffleRollerContainerRef.current.getElementById("ItemNumber78").classList.add("winning-item");
            setRollResult(skin);
            const inventoryElement = document.createElement("div");
            inventoryElement.classList.add("item", "class_red_item");
            inventoryElement.style.backgroundImage = `url(${skinimg})`;
            inventoryRef.current.appendChild(inventoryElement);
        }, 8500);
        raffleRollerContainerRef.current.style.marginLeft = "-6770px";
    }

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    return (<>
        <div class="raffle-roller">
            <div class="raffle-roller-holder">
                <raffleRollerContainer ref={raffleRollerContainerRef}/>
            </div>
        </div>
        <inventory ref={inventoryRef} />
    </>)
}