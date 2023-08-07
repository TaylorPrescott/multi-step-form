const formNavBtns = document.querySelector(".form-nav-wrapper");
const formSteps = ["str to place nodeList in indexes 1-5",...document.querySelectorAll(".form-step")];
const sidebarNums = ["str to place sidebarNums in indexes 1-5",...document.querySelectorAll(".sidebar-num-wrapper")];
const formWrapper = document.querySelector(".form-wrapper");


const formData = {
    plans: ["Arcade", "Advanced", "Pro"],
    monthlyPlanPricing: {
        arcadePlan: 9,
        advancedPlan: 12,
        proPlan: 15
    },
    monthlyAddonPricing: {
        onlineAddOn: 1,
        storageAddOn: 2,
        profileAddOn: 2
    },
    planNames: {
        arcadePlan: "Arcade",
        advancedPlan: "Advanced",
        proPlan: "Pro"
    },
    addOnNames: {
        onlineAddOn: "Online service",
        storageAddOn: "Larger storage",
        profileAddOn: "Customizable profile"
    }
};

let formState = {
    currentStep: 1,
    allStepsVisited: false,
    personalInfo: {
        name: "",
        email: "",
        phone: ""
    },
    plan: "",
    planPrice: 0,
    yearlyPlan: false,
    onlineAddOnState: 0,
    storageAddOnState: 0,
    profileAddOnState: 0,
    addOns: [],
    total: 0
};

const formStyles = {
    stepTwo: {
        highlight: "var(--marine-blue)"
    }
};

const fieldValidator = (field, name) => {
    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const specialCharRegex = /[`!$%^&*_+\=\[\]{};':"\\|,<>\/?~]/;
    
    const errorEl = document.createElement("span");
    errorEl.style.width = "145px";
    errorEl.classList.add("error-text");
    let fieldLabelEl;

    switch (name) {
        case "name":
            fieldLabelEl = field.parentElement.children[0];
            break;
        case "email":
            fieldLabelEl = field.parentElement.children[2];
            break;
        case "phone":
            fieldLabelEl = field.parentElement.children[4];
            break;
    }

    field.classList.remove("error");
        fieldLabelEl.innerHTML = fieldLabelEl.innerHTML.substr(0, 15);

    if (field.value === "") {
        field.classList.add("error");
        errorEl.textContent = "This field is required.";
        fieldLabelEl.appendChild(errorEl);
        return "invalid";
    }
    if (field.value.length > 40) {
        field.classList.add("error");
        errorEl.textContent = "Too many characters.";
        fieldLabelEl.appendChild(errorEl);
        return "invalid";
    }
    if (name === "phone" && !phoneRegex.test(field.value)) {
        field.classList.add("error");
        errorEl.textContent = "Incorrect phone format.";
        fieldLabelEl.appendChild(errorEl);
        return "invalid";
    }
    if (specialCharRegex.test(field.value)) {
        field.classList.add("error");
        errorEl.textContent = "Invalid special characters.";
        fieldLabelEl.appendChild(errorEl);
        return "invalid";
    } else {
        
    }
    return "valid";
}; 

const storeFormInfo = () => {
    const custInfoForm = document.getElementById("custInfoForm");
    const custName = custInfoForm.children[1];
    const custEmail = custInfoForm.children[3];
    const custPhone = custInfoForm.children[5];
    const fields = [custName, custEmail, custPhone];
    let allFieldsValid = false;

    for (let i = 0; i < fields.length; i++) {
        switch (i) {
            case 0: 
            fieldValidator(custName, "name");
                if (fieldValidator(custName, "name") === "valid") {
                    allFieldsValid = true;
                }
                break;
            case 1:
                fieldValidator(custEmail, "email");
                if (allFieldsValid && fieldValidator(custEmail, "email") === "valid") {
                    allFieldsValid = true;
                } else {
                    allFieldsValid = false;
                }
                break;
            case 2:
                fieldValidator(custPhone, "phone");
                if (allFieldsValid && fieldValidator(custPhone, "phone") === "valid") {
                    allFieldsValid = true;
                } else {
                    allFieldsValid = false;
                }
                break;
        }
    }
    
    if (allFieldsValid) {
        formState.personalInfo.name = custName.value;
        formState.personalInfo.email = custEmail.value;
        formState.personalInfo.phone = custPhone.value;
        return true;
    } else {
        return false;
    }

};

const handleStepOne = () => {
    const stepOne = document.querySelector(".one");
    
    formWrapper.style.height = "390px";
    formWrapper.style.placeItems = "center";
};

const stepTwoBtnHighlighter = (btns, index) => {
    btns.forEach(btn => {
        if (btn.classList.contains("twoBtnHighlight")) {
            btn.classList.remove("twoBtnHighlight");
        }
    });
    btns[index].classList.add("twoBtnHighlight");
};

const setPlanPrice = (plan) => {
    let planPrice = formData.monthlyPlanPricing[plan];
    let addOnsPrice = 0;
    

    if (formState.planPrice !== 0) {
        formState.total = formState.total - formState.planPrice;
        formState.planPrice = 0;
    }

    if (formState.yearlyPlan) {
        if (formState.total !== 0 && formState.total < 10) {
            formState.total = formState.total * 10;
        }
        formState.planPrice = planPrice * 10;
        formState.total += planPrice * 10;
    } else {
        if (formState.total !== 0 && formState.total > 10) {
            formState.total = formState.total / 10;
        }
        formState.planPrice = planPrice;
        formState.total += planPrice;
    }
};

const handleStepTwo = () => {
    const stepTwo = document.querySelector(".two");
    const stepTwoBtns = [...document.querySelector(".two-btn-wrapper").children];
    const checkBox = document.getElementById("planCheckbox");
    const monthlyPlan = document.querySelector(".monthly-plan");
    const yearlyPlan = document.querySelector(".yearly-plan");

    let targetIndex = -1;

    document.querySelector(".two-btn-wrapper").addEventListener("click", e => {
        
            if (e.target.id === "arcadePlan" || e.target.parentElement.id === "arcadePlan") {
                targetIndex = 0;
                stepTwoBtnHighlighter(stepTwoBtns, targetIndex);
                formState.plan = "arcade";
                setPlanPrice("arcadePlan");
            }
            if (e.target.id === "advancedPlan" || e.target.parentElement.id === "advancedPlan") {
                targetIndex = 1;
                stepTwoBtnHighlighter(stepTwoBtns, targetIndex);
                formState.plan = "advanced";
                setPlanPrice("advancedPlan");
            }
            if (e.target.id === "proPlan" || e.target.parentElement.id === "proPlan") {
                targetIndex = 2;
                stepTwoBtnHighlighter(stepTwoBtns, targetIndex);
                formState.plan = "pro";
                setPlanPrice("proPlan");
            }
    });

    
    checkBox.addEventListener("click", (e) => {
        if (checkBox.checked) {
            yearlyPlan.classList.add("highlighted-plan")
            monthlyPlan.classList.remove("highlighted-plan");
            for (let i = 0; i < 3; i++) {
                stepTwoBtns[i].children[2].textContent = "$" + formData.monthlyPlanPricing[stepTwoBtns[i].getAttribute("id")] * 10 + "/yr";
            }
            formState.yearlyPlan = true;
            if (formState.plan) {
                setPlanPrice(formState.plan + "Plan");
            }
            
        } else {
            monthlyPlan.classList.add("highlighted-plan")
            yearlyPlan.classList.remove("highlighted-plan");
            for (let i = 0; i < 3; i++) {
                stepTwoBtns[i].children[2].textContent = "$" + formData.monthlyPlanPricing[stepTwoBtns[i].getAttribute("id")] + "/mo";
            }
            formState.yearlyPlan = false;
            if (formState.plan) {
                setPlanPrice(formState.plan + "Plan");
            }
        }
    });
    
    formWrapper.style.height = "450px";
    formWrapper.style.placeItems = "start";

};

const stepThreeBtnHighlighter = (btnId, btnState) =>{
    let btn = document.getElementById(btnId);
    if (!btnState) {
        btn.classList.add("btnHighlight");
    } else {
        btn.classList.remove("btnHighlight");
    }
}; 

const removeAddOn = addon => {
    let updatedAddons = [];
    for (let i = 0; i < formState.addOns.length; i++) {
        if (formState.addOns[i] != addon) {
            updatedAddons.push(formState.addOns[i]);
        }
    }
    formState.addOns = updatedAddons;
};

const pushAddOn = addon => {
    for (let i = 0; i < formState.addOns.length; i++) {
        if (formState.addOns[i] === addon) {
            return;
        }
    }
    formState.addOns.push(addon);
};

const addToTotal = (addOn) => {
    let addOnPrice = formData.monthlyAddonPricing[addOn];
    if (formState.yearlyPlan) {
        formState.total += addOnPrice * 10;
    } else {
        formState.total += addOnPrice;
    }
};

const removeFromTotal = (addOn) => {
    let addOnPrice = formData.monthlyAddonPricing[addOn];
    if (formState.yearlyPlan) {
        formState.total -= addOnPrice * 10; 
    } else {
        formState.total -= addOnPrice;
    }
};

const handleStepThree = () => {
    const stepThree = document.querySelector(".three");
    const addonCheckBoxes = document.querySelectorAll(".check-box");
    const btnWrapper = document.querySelector(".btn-wrapper");

    formWrapper.style.height = "390px";
    formWrapper.style.paddingTop = "5px";

    if (formState.yearlyPlan) {
        for (let i = 0; i < 3; i++) {
            btnWrapper.children[i].children[3].textContent = "$" + formData.monthlyAddonPricing[btnWrapper.children[i].id] * 10 + "/yr";
        }  
    } else {
        for (let i = 0; i < 3; i++) {
            btnWrapper.children[i].children[3].textContent = "$" + formData.monthlyAddonPricing[btnWrapper.children[i].id] + "/mo";
        }
    }

    if (!formState.allStepsVisited) {
        //Event delegation via btn-wrapper to track btn state
        stepThree.children[2].addEventListener("click", e => {
            if (e.target.id == "onlineAddOn" || e.target.parentElement.id == "onlineAddOn") {
                stepThreeBtnHighlighter("onlineAddOn", formState.onlineAddOnState);
                if (!formState.onlineAddOnState) {
                    addonCheckBoxes[0].style.backgroundColor = "var(--purplish-blue)";
                    addonCheckBoxes[0].children[0].classList.remove("hide");
                    pushAddOn("onlineAddOn");
                    addToTotal("onlineAddOn");
                    formState.onlineAddOnState++;
                } else {
                    addonCheckBoxes[0].style.backgroundColor = "var(--white)";
                    addonCheckBoxes[0].children[0].classList.add("hide");
                    removeAddOn("onlineAddOn");
                    removeFromTotal("onlineAddOn");
                    formState.onlineAddOnState--;
                }
            }
            if (e.target.id == "storageAddOn" || e.target.parentElement.id == "storageAddOn") {
                stepThreeBtnHighlighter("storageAddOn", formState.storageAddOnState);
                if (!formState.storageAddOnState) {
                    addonCheckBoxes[1].style.backgroundColor = "var(--purplish-blue)";
                    addonCheckBoxes[1].children[0].classList.remove("hide");
                    pushAddOn("storageAddOn");
                    addToTotal("storageAddOn");
                    formState.storageAddOnState++;
                } else {
                    addonCheckBoxes[1].style.backgroundColor = "var(--white)";
                    addonCheckBoxes[1].children[0].classList.add("hide");
                    removeAddOn("storageAddOn");
                    removeFromTotal("storageAddOn");
                    formState.storageAddOnState--;
                }
            }
            if (e.target.id == "profileAddOn" || e.target.parentElement.id == "profileAddOn") {
                stepThreeBtnHighlighter("profileAddOn", formState.profileAddOnState);
                if (!formState.profileAddOnState) {
                    addonCheckBoxes[2].style.backgroundColor = "var(--purplish-blue)";
                    addonCheckBoxes[2].children[0].classList.remove("hide");
                    pushAddOn("profileAddOn");
                    addToTotal("profileAddOn");
                    formState.profileAddOnState++;
                } else {
                    addonCheckBoxes[2].style.backgroundColor = "var(--white)";
                    addonCheckBoxes[2].children[0].classList.add("hide");
                    removeAddOn("profileAddOn");
                    removeFromTotal("profileAddOn");
                    formState.profileAddOnState--;
                }
            }
        });
    }
};

const setReceiptPlanPrice = (plan, el) => {
    if (formState.yearlyPlan) {
        el.textContent = "$" + formData.monthlyPlanPricing[plan] * 10 + "/yr";
    } else {
        el.textContent = "$" + formData.monthlyPlanPricing[plan] + "/mo";
    }
};

const receiptChangeFrequency = () => {
    const receiptWrapper = document.querySelector(".receipt-wrapper");
};

const setReceiptTotal = () => {
    const totalWrapper = document.querySelector(".total-wrapper");
    if (formState.yearlyPlan) {
        totalWrapper.children[0].textContent = "Total (per year)";
        totalWrapper.children[1].textContent = "+$" + formState.total + "/yr";
    } else {
        totalWrapper.children[0].textContent = "Total (per month)";
        totalWrapper.children[1].textContent = "+$" + formState.total + "/mo";
    }
};

const removeReceiptAddOns = () => {
    const addOns = document.querySelectorAll(".receipt-add-on");
    for (let i = 0; i < addOns.length; i++) {
        addOns[i].remove();
    }
};

const appendReceiptAddOns = (name, price) => {
    if (formState.yearlyPlan) {
        price = price * 10;
    }

    const monthlyStr = "/mo";
    const yearlyStr = "/yr";
    const div = document.createElement("div");
    const nameEl = document.createElement("p");
    const priceEl = document.createElement("p");
    div.classList.add("receipt-add-on");
    nameEl.classList.add("add-on");
    priceEl.classList.add("add-on-receipt-price");
    nameEl.textContent = formData.addOnNames[name];
    priceEl.textContent = "+$" + price;

    if (formState.yearlyPlan) {
        priceEl.textContent += yearlyStr;
    } else {
        priceEl.textContent += monthlyStr;
    }
    div.appendChild(nameEl);
    div.appendChild(priceEl);
    document.querySelector(".add-on-receipt-wrapper").appendChild(div);
};

const handleStepFour = () => {
    const stepFour = document.querySelector(".four");
    const planWrapper = document.querySelector(".receipt-plan");
    //Change Step 4 Container Height
    if (formState.addOns.length <= 1) {
        formWrapper.style.height = "310px";
    } else if (formState.addOns.length < 3) {
        formWrapper.style.height = "350px";
    } else {
        formWrapper.style.height = "365px";
    }

    if (!formState.allStepsVisited) {
        planWrapper.children[1].addEventListener("click", e => {
            e.preventDefault();

        });
    }

    //Display plan name & price
    if (formState.yearlyPlan) {
        planWrapper.children[0].textContent = formData.planNames[formState.plan + "Plan"] + " (Yearly)";
    } else {
        planWrapper.children[0].textContent = formData.planNames[formState.plan + "Plan"] + " (Monthly)";
    }
    setReceiptPlanPrice(formState.plan + "Plan", planWrapper.children[2]);

    //Append add ons
    removeReceiptAddOns();
    for (let i = 0; i < formState.addOns.length; i++) {
        let price = formData.monthlyAddonPricing[formState.addOns[i]];
        appendReceiptAddOns(formState.addOns[i], price);
    }

    setReceiptTotal();
    formState.allStepsVisited = true;
};

const handleStepFive = () => {
    const stepFive = document.querySelector(".five");

};


const highlightStep = (currStep, nextStep) => {
    sidebarNums[currStep].classList.remove("highlighted-num");
    sidebarNums[nextStep].classList.add("highlighted-num");
};


const displayStep = (currStep, nextStep) => {
    let direction;
    if (currStep < nextStep) {
        direction = "forward";
    } else {
        direction = "back";
    }
    switch (currStep) {
        case 1: 
            formSteps[currStep].classList.add("hide");
            formSteps[nextStep].classList.remove("hide");

            handleStepTwo();

            break;
        case 2: 
            formSteps[currStep].classList.add("hide");
            formSteps[nextStep].classList.remove("hide");
            if (direction === "back") {
                handleStepOne();
            } else {
                handleStepThree();
            }
            break;
        case 3: 
            formSteps[currStep].classList.add("hide");
            formSteps[nextStep].classList.remove("hide");
            if (direction === "back") {
                handleStepTwo()
            } else {
                handleStepFour();
            }
            break;
        case 4: 
            formSteps[currStep].classList.add("hide");
            formSteps[nextStep].classList.remove("hide");
            if (direction === "back") {
                handleStepThree();
            } else {
                handleStepFive();
            }
            break;
    }

};

formNavBtns.addEventListener("click", e => {

    // Handle form nav buttons
    if (e.target.classList[1] === "next" && formState.currentStep < 4) {
        if (formState.currentStep === 1 && storeFormInfo()) {
            highlightStep(formState.currentStep, formState.currentStep + 1);
            displayStep(formState.currentStep, formState.currentStep + 1);
            formState.currentStep++;
        } else if (formState.currentStep != 1) {
            highlightStep(formState.currentStep, formState.currentStep + 1);
            displayStep(formState.currentStep, formState.currentStep + 1);
            formState.currentStep++;
        }
    }
    if (e.target.classList[1] === "back" && formState.currentStep > 1) {
        highlightStep(formState.currentStep, formState.currentStep - 1);
        displayStep(formState.currentStep, formState.currentStep - 1);
        formState.currentStep--;
    }

    if (e.target.classList[1] === "confirm") {
        sidebarNums[4].classList.remove("highlighted-num");
        displayStep(4, 5);
        document.querySelector(".back").classList.add("hide");
        document.querySelector(".confirm").classList.add("hide");
        formState.currentStep++;
    }

    // hide "go back" if on step 1
    if (formState.currentStep === 1) {
        document.querySelector(".back").classList.add("hide");
    }
    
    // display "go back" if past step 1
    if (formState.currentStep > 1 && formState.currentStep < 5) {
        document.querySelector(".confirm").classList.add("hide");
        document.querySelector(".next").classList.remove("hide");
        document.querySelector(".back").classList.remove("hide");
    }

    // Display confirm on step 4
    if (formState.currentStep === 4) {
        document.querySelector(".next").classList.add("hide");
        document.querySelector(".confirm").classList.remove("hide");
    }
});

handleStepOne();