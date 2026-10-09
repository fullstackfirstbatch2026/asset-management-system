const API = "http://localhost:8081";


function showSection(sectionId, button = null) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }

    const buttons = document.querySelectorAll(".nav-menu button");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    const titles = {
        dashboard: "Dashboard",
        employees: "Employees",
        assets: "Assets",
        assetTypes: "Asset Types",
        allocations: "Allocations",
        joinSection: "Allocation Report",
        reportsSection: "Asset Reports"
    };

    if (document.getElementById("pageTitle")) {
        document.getElementById("pageTitle").innerText =
            titles[sectionId] || "Asset Management";
    }

    if (sectionId === "dashboard") {
        loadDashboard();
    }

    if (sectionId === "employees") {
        loadEmployees();
    }

    if (sectionId === "assetTypes") {
        loadAssetTypes();
    }

    if (sectionId === "assets") {
        loadAssets();
    }

    if (sectionId === "allocations") {
        loadAllocations();
    }

    if (sectionId === "joinSection") {
        loadJoinedAllocations();
    }

    if (sectionId === "reportsSection") {
        loadAboveAverage();
    }
}


/* DASHBOARD */

async function loadDashboard() {

    try {

        const employeesResponse =
            await fetch(API + "/employees");

        const employees =
            await employeesResponse.json();

        document.getElementById("employeeCount").innerText =
            employees.length;


        const assetsResponse =
            await fetch(API + "/assets");

        const assets =
            await assetsResponse.json();

        document.getElementById("assetCount").innerText =
            assets.length;

        const availableAssets =
            assets.filter(asset => asset.available);

        document.getElementById("availableCount").innerText =
            availableAssets.length;


        const allocationsResponse =
            await fetch(API + "/allocations");

        const allocations =
            await allocationsResponse.json();

        document.getElementById("allocationCount").innerText =
            allocations.length;

        displayRecentAllocations(allocations);

    } catch (error) {

        console.error("Dashboard error:", error);

    }
}


function displayRecentAllocations(allocations) {

    const container =
        document.getElementById("recentAllocations");

    if (!container) {
        return;
    }

    if (allocations.length === 0) {

        container.innerHTML =
            `<div class="empty-message">No allocations found</div>`;

        return;
    }

    const recent =
        allocations.slice(-5).reverse();

    let html = "";

    recent.forEach(allocation => {

        html += `
            <div class="recent-item">

                <div>
                    <strong>
                        ${allocation.employee.employeeName}
                    </strong>

                    <span>
                        ${allocation.asset.assetName}
                    </span>
                </div>

                <span>
                    ${allocation.allocationDate}
                </span>

            </div>
        `;

    });

    container.innerHTML = html;
}


/* EMPLOYEES */

async function loadEmployees() {

    try {

        const response =
            await fetch(API + "/employees");

        const employees =
            await response.json();

        let html = `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Phone</th>
                </tr>
        `;

        employees.forEach(employee => {

            html += `
                <tr>
                    <td>${employee.employeeId}</td>
                    <td>${employee.employeeName}</td>
                    <td>${employee.email}</td>
                    <td>${employee.department}</td>
                    <td>${employee.phone}</td>
                </tr>
            `;

        });

        html += "</table>";

        document.getElementById("employeeList").innerHTML =
            html;

    } catch (error) {

        console.error("Employee error:", error);

    }
}


async function addEmployee() {

    const employee = {

        employeeName:
            document.getElementById("employeeName").value,

        email:
            document.getElementById("employeeEmail").value,

        department:
            document.getElementById("employeeDepartment").value,

        phone:
            document.getElementById("employeePhone").value

    };

    const response =
        await fetch(API + "/employees", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

    if (response.ok) {

        alert("Employee added successfully");

        document.getElementById("employeeName").value = "";
        document.getElementById("employeeEmail").value = "";
        document.getElementById("employeeDepartment").value = "";
        document.getElementById("employeePhone").value = "";

        loadEmployees();
        loadDashboard();

    } else {

        alert("Failed to add employee");

    }
}


/* ASSET TYPES */

async function loadAssetTypes() {

    try {

        const response =
            await fetch(API + "/asset-types");

        const assetTypes =
            await response.json();

        let html = `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Type Name</th>
                    <th>Description</th>
                </tr>
        `;

        assetTypes.forEach(type => {

            html += `
                <tr>
                    <td>${type.assetTypeId}</td>
                    <td>${type.typeName}</td>
                    <td>${type.description}</td>
                </tr>
            `;

        });

        html += "</table>";

        document.getElementById("assetTypeList").innerHTML =
            html;

    } catch (error) {

        console.error("Asset type error:", error);

    }
}


async function addAssetType() {

    const assetType = {

        typeName:
            document.getElementById("typeName").value,

        description:
            document.getElementById("typeDescription").value

    };

    const response =
        await fetch(API + "/asset-types", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(assetType)

        });

    if (response.ok) {

        alert("Asset type added successfully");

        document.getElementById("typeName").value = "";
        document.getElementById("typeDescription").value = "";

        loadAssetTypes();

    } else {

        alert("Failed to add asset type");

    }
}


/* ASSETS */

async function loadAssets() {

    try {

        const response =
            await fetch(API + "/assets");

        const assets =
            await response.json();

        let html = `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Asset Type</th>
                    <th>Serial Number</th>
                    <th>Purchase Date</th>
                    <th>Availability</th>
                </tr>
        `;

        assets.forEach(asset => {

            html += `
                <tr>

                    <td>${asset.assetId}</td>

                    <td>${asset.assetName}</td>

                    <td>${asset.assetType.typeName}</td>

                    <td>${asset.serialNumber}</td>

                    <td>${asset.purchaseDate}</td>

                    <td>
                        ${
                            asset.available
                            ? '<span class="status available">Available</span>'
                            : '<span class="status allocated">Allocated</span>'
                        }
                    </td>

                </tr>
            `;

        });

        html += "</table>";

        document.getElementById("assetList").innerHTML =
            html;

    } catch (error) {

        console.error("Asset error:", error);

    }
}


async function addAsset() {

    const asset = {

        assetName:
            document.getElementById("assetName").value,

        assetType: {

            assetTypeId: Number(
                document.getElementById("assetTypeId").value
            )

        },

        serialNumber:
            document.getElementById("serialNumber").value,

        purchaseDate:
            document.getElementById("purchaseDate").value,

        available: true

    };

    const response =
        await fetch(API + "/assets", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(asset)

        });

    if (response.ok) {

        alert("Asset added successfully");

        document.getElementById("assetName").value = "";
        document.getElementById("assetTypeId").value = "";
        document.getElementById("serialNumber").value = "";
        document.getElementById("purchaseDate").value = "";

        loadAssets();
        loadDashboard();

    } else {

        alert("Failed to add asset");

    }
}


/* ALLOCATIONS */

async function loadAllocations() {

    try {

        const response =
            await fetch(API + "/allocations");

        const allocations =
            await response.json();

        let html = `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Asset</th>
                    <th>Allocation Date</th>
                    <th>Return Date</th>
                </tr>
        `;

        allocations.forEach(allocation => {

            html += `
                <tr>

                    <td>${allocation.allocationId}</td>

                    <td>
                        ${allocation.employee.employeeName}
                    </td>

                    <td>
                        ${allocation.asset.assetName}
                    </td>

                    <td>
                        ${allocation.allocationDate}
                    </td>

                    <td>
                        ${
                            allocation.returnDate
                            || '<span class="status allocated">Not Returned</span>'
                        }
                    </td>

                </tr>
            `;

        });

        html += "</table>";

        document.getElementById("allocationList").innerHTML =
            html;

    } catch (error) {

        console.error("Allocation error:", error);

    }
}


async function allocateAsset() {

    const employeeId =
        document.getElementById("allocationEmployeeId").value;

    const assetId =
        document.getElementById("allocationAssetId").value;

    const allocationDate =
        document.getElementById("allocationDate").value;

    const data = {

        employeeId: Number(employeeId),

        assetId: Number(assetId),

        allocationDate: allocationDate

    };

    const response =
        await fetch(
            API + "/allocations/procedure",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

    if (response.ok) {

        alert("Asset allocated successfully");

        document.getElementById("allocationEmployeeId").value = "";
        document.getElementById("allocationAssetId").value = "";
        document.getElementById("allocationDate").value = "";

        loadAllocations();
        loadJoinedAllocations();
        loadAssets();
        loadDashboard();

    } else {

        const errorText =
            await response.text();

        alert(
            "Failed to allocate asset: " +
            errorText
        );
    }
}


/* JOIN REPORT */

async function loadJoinedAllocations() {

    try {

        const response =
            await fetch(API + "/allocations/join");

        const allocations =
            await response.json();

        let html = `
            <table>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Asset ID</th>
                    <th>Asset Name</th>
                    <th>Serial Number</th>
                    <th>Allocation Date</th>
                </tr>
        `;

        allocations.forEach(row => {

            html += `
                <tr>

                    <td>${row[0]}</td>

                    <td>${row[1]}</td>

                    <td>${row[2]}</td>

                    <td>${row[3]}</td>

                    <td>${row[4]}</td>

                    <td>${row[5]}</td>

                    <td>${row[6]}</td>

                </tr>
            `;

        });

        html += "</table>";

        document.getElementById("joinList").innerHTML =
            html;

    } catch (error) {

        console.error("JOIN report error:", error);

    }
}


/* FUNCTION - COUNT EMPLOYEE ASSETS */

async function countEmployeeAssets() {

    const employeeId =
        document.getElementById("countEmployeeId").value;

    if (!employeeId) {

        document.getElementById("countResult").innerText =
            "Please enter an employee ID.";

        return;
    }

    try {

        const response =
            await fetch(
                API +
                "/employees/" +
                employeeId +
                "/asset-count"
            );

        if (response.ok) {

            const count =
                await response.text();

            document.getElementById("countResult").innerText =
                "Employee has " +
                count +
                " asset(s)";

        } else {

            document.getElementById("countResult").innerText =
                "Failed to get asset count";

        }

    } catch (error) {

        console.error("Count function error:", error);

        document.getElementById("countResult").innerText =
            "Unable to connect to backend";

    }
}


/* SUBQUERY - ABOVE AVERAGE */

async function loadAboveAverage() {

    try {

        const response =
            await fetch(
                API + "/asset-types/above-average"
            );

        if (!response.ok) {

            document.getElementById("aboveAverageList").innerHTML =
                `<div class="empty-message">
                    Failed to load above-average asset types
                </div>`;

            return;
        }

        const assetTypes =
            await response.json();

        if (assetTypes.length === 0) {

            document.getElementById("aboveAverageList").innerHTML =
                `<div class="empty-message">
                    No asset type is above average
                </div>`;

            return;
        }

        let html = `
            <table>
                <tr>
                    <th>Asset Type ID</th>
                    <th>Asset Type</th>
                    <th>Allocation Count</th>
                </tr>
        `;

        assetTypes.forEach(row => {

            html += `
                <tr>

                    <td>${row[0]}</td>

                    <td>${row[1]}</td>

                    <td>${row[2]}</td>

                </tr>
            `;

        });

        html += "</table>";

        document.getElementById("aboveAverageList").innerHTML =
            html;

    } catch (error) {

        console.error("Above average error:", error);

        document.getElementById("aboveAverageList").innerHTML =
            `<div class="empty-message">
                Unable to connect to backend
            </div>`;
    }
}


/* DATE */

function setTodayDate() {

    const today =
        new Date();

    const formattedDate =
        today.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    const dateElement =
        document.getElementById("todayDate");

    if (dateElement) {
        dateElement.innerText =
            formattedDate;
    }
}


/* INITIAL LOAD */

setTodayDate();

loadEmployees();

loadAssetTypes();

loadAssets();

loadAllocations();

loadDashboard();