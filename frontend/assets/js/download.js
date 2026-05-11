
document.addEventListener("DOMContentLoaded", function () {

    // ========================
    // DOWNLOAD BUTTON (SAFE)
    // ========================
    const downloadBtn = document.getElementById("download-btn");

    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {
            const fileUrl = "assets/Assignment Of Version control part one.pdf";

            window.open(fileUrl, "_blank");

            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = "Assignment Of Version control part one.pdf";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // ========================
    // FEEDBACK FORM
    // ========================
    const form = document.getElementById("feedbackForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const rating = document.querySelector('input[name="rating"]:checked');

            const feedbackData = {
                name: document.getElementById("fb-name")?.value || "",
                email: document.getElementById("fb-email")?.value || "",
                user: document.getElementById("fb-user")?.value || "",
                category: document.getElementById("fb-category")?.value || "",
                message: document.getElementById("fb-message")?.value || "",
                rating: rating ? rating.value : ""
            };

            // Save data
            localStorage.setItem("feedbackData", JSON.stringify(feedbackData));

            // Scroll to feedback display section
            const community = document.getElementById("community-feedback");
            if (community) {
                community.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // ========================
    // LOAD SAVED DATA BACK
    // ========================
    const saved = JSON.parse(localStorage.getItem("feedbackData"));

    if (saved) {
        if (document.getElementById("fb-name")) {
            document.getElementById("fb-name").value = saved.name || "";
            document.getElementById("fb-email").value = saved.email || "";
            document.getElementById("fb-user").value = saved.user || "";
            document.getElementById("fb-category").value = saved.category || "";
            document.getElementById("fb-message").value = saved.message || "";
        }
    }

});

// ========================
// FEEDBACK FORM
// ========================

const form = document.getElementById("feedbackForm");

if (form) {

    // LOAD SAVED FEEDBACK WHEN PAGE LOADS
    loadCommunityFeedback();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const feedbackData = {
            name: document.getElementById("fb-name").value || "Anonymous User",
            email: document.getElementById("fb-email").value,
            user: document.getElementById("fb-user").value,
            category: document.getElementById("fb-category").value,
            message: document.getElementById("fb-message").value,
            date: new Date().toLocaleDateString()
        };

        // SAVE TEMPORARILY
        localStorage.setItem(
            "communityFeedback",
            JSON.stringify(feedbackData)
        );

        // SHOW FEEDBACK
        displayCommunityFeedback(feedbackData);

        // RESET FORM
        form.reset();

        // SCROLL TO COMMUNITY SECTION
        document.getElementById("community-feedback")
            .scrollIntoView({ behavior: "smooth" });
    });
}


// ========================
// DISPLAY FEEDBACK CARD
// ========================

function displayCommunityFeedback(data) {

    const feedbackGrid = document.getElementById("feedbackGrid");

    // Replace existing static cards
    feedbackGrid.innerHTML = `

        <div style="
            background: #fff;
            padding: 40px 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            position: relative;
            transition: transform 0.3s;
        ">

            <i class="fas fa-quote-right"
               style="
                    position:absolute;
                    top:30px;
                    right:30px;
                    font-size:3rem;
                    color:#f1f5f9;
               ">
            </i>

            <!-- STARS -->
            <div style="
                display:flex;
                gap:5px;
                color:#f1c40f;
                margin-bottom:20px;
                font-size:1.1rem;
            ">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>

            <!-- MESSAGE -->
            <p style="
                color:#555;
                font-size:1.05rem;
                line-height:1.7;
                font-style:italic;
                margin-bottom:25px;
            ">
                "${data.message}"
            </p>

            <!-- USER INFO -->
            <div style="
                display:flex;
                align-items:center;
                gap:15px;
            ">

                <div style="
                    width:55px;
                    height:55px;
                    border-radius:50%;
                    background:#3498db;
                    color:#fff;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:1.5rem;
                    font-weight:bold;
                    text-transform:uppercase;
                ">
                    ${data.name.charAt(0)}
                </div>

                <div>
                    <h5 style="
                        color:#2c3e50;
                        font-size:1.1rem;
                        margin:0;
                    ">
                        ${data.name}
                    </h5>

                    <span style="
                        color:#7f8c8d;
                        font-size:0.9rem;
                    ">
                        ${data.user} • ${data.category}
                    </span>

                    <br>

                    <small style="color:#999;">
                        ${data.date}
                    </small>
                </div>

            </div>
        </div>
    `;
}


// ========================
// LOAD SAVED FEEDBACK
// ========================

function loadCommunityFeedback() {

    const savedFeedback = JSON.parse(
        localStorage.getItem("communityFeedback")
    );

    if (savedFeedback) {
        displayCommunityFeedback(savedFeedback);
    }
}
// ==========================
// BUBBLE MENU ACTIVE TOGGLE
// ==========================
const bubbleItems = document.querySelectorAll(".bubble-item");

bubbleItems.forEach(item => {
    item.addEventListener("click", function () {

        // remove active from all
        bubbleItems.forEach(i => i.classList.remove("active"));

        // add active to clicked
        this.classList.add("active");
    });
});
// ==========================
// HALF PAGE MENU
// ==========================

const openMenuBtn = document.getElementById("openMenuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const sideMenu = document.getElementById("sideMenu");

// OPEN MENU
openMenuBtn.addEventListener("click", () => {
    sideMenu.classList.add("active");
});

// CLOSE MENU
closeMenuBtn.addEventListener("click", () => {
    sideMenu.classList.remove("active");
});

// CLOSE WHEN LINK CLICKED
document.querySelectorAll(".side-menu a").forEach(link => {
    link.addEventListener("click", () => {
        sideMenu.classList.remove("active");
    });
});

// ========================
// BACK TO FORM BUTTON
// ========================

function backToForm() {

    const feedbackSection = document.getElementById("feedback");

    if (feedbackSection) {
        feedbackSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}