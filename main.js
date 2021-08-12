import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";

let vctrApi;

const defaultView = document.getElementById("defaultView");

const switchingInProgress = false;

const lip = document.getElementById("lip");
const fluid = document.getElementById("fluid");
const handle = document.getElementById("handle");
const thermal = document.getElementById("thermal");
const expand = document.getElementById("expand");

const randomColor = document.getElementById("randomColor");

const blackBtn = document.getElementById("blackBtn");
const blueBtn = document.getElementById("blueBtn");
const yellowBtn = document.getElementById("yellowBtn");

// const rootDocument = !!document.getElementsByTagName("iframe").length ?
//     document.getElementsByTagName("iframe")[0].contentWindow.document :
//     document;

//     console.log(rootDocument);

const iframe = document.getElementById("f0945394-b36f-4ba9-b56e-f35079e48614");

const iFrame = document.getElementById('f0945394-b36f-4ba9-b56e-f35079e48614').contentWindow.document.body.innerHTML;
console.log(iFrame);

const annotationSwitch = true;
const highlightState = false;

const annotations = [
    {
        label: "1",
        name: "Lip",
        text: "Lorem Ipsum",
        objectName: "Lip"
    },
    {
        label: "2",
        name: "Fluid Dynamics",
        text: "Lorem Ipsum",
        objectName: "Fluid-Dynamics"
    },
    {
        label: "3",
        name: "Handle",
        text: "Lorem Ipsum",
        objectName: "Handle"
    },
    {
        label: "4",
        name: "Thermal",
        text: "Lorem Ipsum",
        objectName: "Thermal"
    },
];

let annotationsIds = [];

//Annotations
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
    // rootDocument.addEventListener("click", async _event => {
    //     const objectsHit = await vctrApi.getHitObjects();
    //     console.log(objectsHit);
    //     if (objectsHit.length) {
    //         console.log(objectsHit);
    //         // selectByName(meshSelector, objectsHit[0].name);
    //         // selectByName(materialSelector, objectsHit[0].material);
    //     }
    // });

    randomColor.addEventListener("click", async _event => {
        const iframeWindow = iframe.contentWindow;
        console.log(iframeWindow);
        // console.log(`Applying ${materialSelector.value} material onto ${meshSelector.value}`);
        // const changeMaterialSuccess = await vctrApi.setMaterial(meshSelector.value, materialSelector.value);
        // console.log(`Material change success: ${changeMaterialSuccess}`);

        // if (colorSelector.value !== "no-change") {
        //     const colorChangeResult = await vctrApi.updateMaterial(materialSelector.value, { color: colorSelector.value });

        //     console.log("Color change success:", colorChangeResult);
        // }
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
    onReady();
}

run();


