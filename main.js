import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";

let vctrApi;

let defaultView = document.getElementById("defaultView");

let switchingInProgress = false;

let lip = document.getElementById("lip");
let fluid = document.getElementById("fluid");
let handle = document.getElementById("handle");
let thermal = document.getElementById("thermal");
let expand = document.getElementById("expand");

let blackBtn = document.getElementById("blackBtn");
let blueBtn = document.getElementById("blueBtn");
let yellowBtn = document.getElementById("yellowBtn");

let randomColor = document.getElementById("randomColor");

let annotationSwitch = true;
let highlightState = false;

const annotations = [
    {
        label: "1",
        name: "Lip",
        text: "Simply dummy text of the printing and typesetting industry",
        objectName: "Lip"
    },
    {
        label: "2",
        name: "Fluid Dynamics",
        text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
        objectName: "Fluid-Dynamics"
    },
    {
        label: "3",
        name: "Handle",
        text: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
        objectName: "Handle"
    },
    {
        label: "4",
        name: "Thermal",
        text: "There are many variations of passages of Lorem Ipsum available",
        objectName: "Thermal"
    },
];

let annotationsIds = [];

function addAnotations() {
    annotations.forEach(async annotation => {
        const currentAnnotation = await vctrApi.addAnnotation(annotation);
        annotationsIds.push(currentAnnotation.id);
    })
}

function addAnnotationListeners() {
    lip.addEventListener("click", async _event => {
        if (!highlightState && annotationSwitch) {
            await vctrApi.highlightMeshesByName(["Lip"], "#fcba03", 0.8, false);
            await vctrApi.expandAnnotationsById(annotationsIds[0], true, true);
            highlightState = true;
        } else {
            await vctrApi.unhighlightMeshesByName(["Lip"]);
            await vctrApi.expandAnnotationsById(annotationsIds[0], false, false);
            highlightState = false;
        }
    });

    fluid.addEventListener("click", async _event => {
        if (!highlightState && annotationSwitch) {
            await vctrApi.highlightMeshesByName(["Fluid-Dynamics"], "#fcba03", 0.8, false);
            await vctrApi.expandAnnotationsById(annotationsIds[0], true, true);
            highlightState = true;
        } else {
            await vctrApi.unhighlightMeshesByName(["Fluid-Dynamics"]);
            await vctrApi.expandAnnotationsById(annotationsIds[0], false, false);
            highlightState = false;
        }
    });

    handle.addEventListener("click", async _event => {
        if (!highlightState && annotationSwitch) {
            await vctrApi.highlightMeshesByName(["Handle"], "#fcba03", 0.8, false);
            await vctrApi.expandAnnotationsById(annotationsIds[0], true, true);
            highlightState = true;
        } else {
            await vctrApi.unhighlightMeshesByName(["Handle"]);
            await vctrApi.expandAnnotationsById(annotationsIds[0], false, false);
            highlightState = false;
        }
    });

    thermal.addEventListener("click", async _event => {
        if (!highlightState && annotationSwitch) {
            await vctrApi.highlightMeshesByName(["Thermal"], "#fcba03", 0.8, false);
            await vctrApi.expandAnnotationsById(annotationsIds[0], true, true);
            highlightState = true;
        } else {
            await vctrApi.unhighlightMeshesByName(["Thermal"]);
            await vctrApi.expandAnnotationsById(annotationsIds[0], false, false);
            highlightState = false;
        }
    });

    expand.addEventListener("click", async _event => {
        annotationSwitch = !annotationSwitch;
        await vctrApi.enableAnnotations(annotationSwitch);
    });
}

// Camera View 
function addCameraViewListeners() {
    defaultView.addEventListener("click", async _event => {
        console.log(_event);
        if (!switchingInProgress) {
            switchingInProgress = true;
            await vctrApi.switchViewAsync("Camera");
            console.log("Camera switched");
            switchingInProgress = false;
        }
    });
}

function addRandomColorListeners() {
    randomColor.addEventListener("click", async _event => {

    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    const colorChangeResult = await vctrApi.updateMaterial("Mug", { color: "#" + randomColor });
    console.log("Color change success:", colorChangeResult);
    });
}   

function addColorListeners() {
    blackBtn.addEventListener("click", async _event => {
        const colorChangeResult = await vctrApi.updateMaterial("Mug", { color: "#252324" });
        console.log("Color change success:", colorChangeResult);
    });

    blueBtn.addEventListener("click", async _event => {
        const colorChangeResult = await vctrApi.updateMaterial("Mug", { color: "#0D5BE1" });
        console.log("Color change success:", colorChangeResult);
    });

    yellowBtn.addEventListener("click", async _event => {
        const colorChangeResult = await vctrApi.updateMaterial("Mug", { color: "#FAE481" });
        console.log("Color change success:", colorChangeResult);
    });
}   

async function run() {
    console.log("Example script running..");

    function errHandler(err) {
        console.log("API error", err);
    }

    async function onReady() {
        console.log("API ready..");
    }

    vctrApi = new VctrApi("f0945394-b36f-4ba9-b56e-f35079e48614", errHandler);
    try {
        await vctrApi.init();
    } catch (e) {
        errHandler(e);
    }

    await vctrApi.enableAnnotations(annotationSwitch);
    addAnotations();
    addAnnotationListeners();
    addCameraViewListeners();
    addRandomColorListeners();
    addColorListeners();
    onReady();
}

run();


