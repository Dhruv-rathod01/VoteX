import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

/* Party Selection */

function selectParty(party, element) {

    document.getElementById("party").value = party;

    document.getElementById("selectedParty").innerText = party;

    document
        .querySelectorAll(".party-card")
        .forEach(card =>
            card.classList.remove("selected")
        );

    element.classList.add("selected");
}

window.selectParty = selectParty;

/* Voting Function */

async function castVote() {

    const name =
        document.getElementById("name").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const party =
        document.getElementById("party").value;

    const message =
        document.getElementById("message");

    if (!name || !mobile || !party) {

        message.innerText =
            "Please complete all fields.";

        return;
    }

    /* Mobile Validation */

    if (!/^[6-9]\d{9}$/.test(mobile)) {

        message.innerText =
            "Enter a valid 10-digit Indian mobile number.";

        return;
    }

    try {

        const voteRef =
            collection(db, "votes");

        const q = query(
            voteRef,
            where("mobile", "==", mobile)
        );

        const snapshot =
            await getDocs(q);

        if (!snapshot.empty) {

            message.innerText =
                "You have already voted.";

            return;
        }

        await addDoc(voteRef, {

            name: name,
            mobile: mobile,
            party: party,
            timestamp: new Date()

        });

        message.innerText =
            "✅ Vote Submitted Successfully";

        document.getElementById("name").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("party").value = "";

        document.getElementById(
            "selectedParty"
        ).innerText = "None";

        document
            .querySelectorAll(".party-card")
            .forEach(card =>
                card.classList.remove("selected")
            );

    } catch (error) {

        console.error(error);

        message.innerText =
            "❌ Error while voting.";

    }
}

window.castVote = castVote;