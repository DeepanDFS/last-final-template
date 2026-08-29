<script>

/* =====================================================
   CHATBOT
===================================================== */

const dfChatButton = document.getElementById("df-chat-button");
const dfChatBox = document.getElementById("df-chat-box");
const dfChatClose = document.getElementById("df-chat-close");

const dfChatInput = document.getElementById("df-chat-input");
const dfChatSend = document.getElementById("df-chat-send");

const dfMessages = document.getElementById("df-chat-messages");


/* OPEN CHAT */

dfChatButton.addEventListener("click", function () {

    dfChatBox.style.display = "flex";

    dfChatInput.focus();

});


/* CLOSE CHAT */

dfChatClose.addEventListener("click", function () {

    dfChatBox.style.display = "none";

});


/* ADD MESSAGE */

function dfAddMessage(message, type) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add(
        "df-message",
        type === "user"
            ? "df-user-message"
            : "df-bot-message"
    );

    messageDiv.innerHTML = message;

    dfMessages.appendChild(messageDiv);

    dfMessages.scrollTop = dfMessages.scrollHeight;
}


/* BOT RESPONSE */

function dfBotResponse(message) {

    const text = message.toLowerCase();


    /* COURSES */

    if (
        text.includes("course") ||
        text.includes("learn") ||
        text.includes("training")
    ) {

        return `
        📚 <strong>Stock Market Courses</strong><br><br>

        We offer structured programs for different levels:

        <br><br>

        • Basics &amp; Equity – <strong>₹2,999</strong><br>
        • Technical Analysis – <strong>₹7,999</strong><br>
        • Futures &amp; Options – <strong>₹6,999</strong><br>
        • Commodity Trading – <strong>₹3,999</strong><br>
        • Complete Stock Market Mastery – <strong>₹19,999</strong><br>
        • Complete + Mentorship – <strong>₹29,999</strong>

        <br><br>

        Would you like to know more about a particular course?
        `;
    }


    /* PRICES */

    if (
        text.includes("price") ||
        text.includes("fee") ||
        text.includes("cost")
    ) {

        return `
        💰 <strong>Course Pricing</strong><br><br>

        Basics &amp; Equity: ₹2,999<br>
        Technical Analysis: ₹7,999<br>
        Futures &amp; Options: ₹6,999<br>
        Commodity Trading: ₹3,999<br><br>

        ⭐ Complete Stock Market Mastery:
        <strong>₹19,999</strong><br><br>

        👑 Complete + Mentorship:
        <strong>₹29,999</strong>
        `;
    }


    /* MUTUAL FUNDS */

    if (
        text.includes("mutual") ||
        text.includes("sip")
    ) {

        return `
        📈 <strong>Mutual Funds</strong><br><br>

        We provide guidance and educational support
        regarding mutual funds, SIPs and long-term
        financial planning.

        <br><br>

        For personalized requirements, please contact
        our team.
        `;
    }


    /* INSURANCE */

    if (
        text.includes("insurance") ||
        text.includes("policy")
    ) {

        return `
        🛡️ <strong>Insurance</strong><br><br>

        We can help you understand different insurance
        products and their role in financial planning.

        <br><br>

        Please contact us for further assistance.
        `;
    }


    /* INVESTMENT */

    if (
        text.includes("invest") ||
        text.includes("investment")
    ) {

        return `
        📊 <strong>Investment Planning</strong><br><br>

        Investment decisions should be based on your
        financial goals, time horizon and risk tolerance.

        <br><br>

        We can help you understand different investment
        options and financial concepts.
        `;
    }


    /* NISM */

    if (
        text.includes("nism") ||
        text.includes("certificate")
    ) {

        return `
        🎓 <strong>NISM</strong><br><br>

        We provide stock market education and awareness
        support, including preparation-oriented learning
        for relevant NISM examinations.

        <br><br>

        Please contact us for current program details.
        `;
    }


    /* TRADING */

    if (
        text.includes("trading") ||
        text.includes("trader")
    ) {

        return `
        📊 <strong>Trading Education</strong><br><br>

        Our trading education covers:

        <br><br>

        • Technical Analysis<br>
        • Price Action<br>
        • Futures &amp; Options<br>
        • Risk Management<br>
        • Practical Market Learning

        <br><br>

        Trading involves significant risk. Education
        does not guarantee profits.
        `;
    }


    /* CONTACT */

    if (
        text.includes("contact") ||
        text.includes("phone") ||
        text.includes("whatsapp") ||
        text.includes("talk")
    ) {

        return `
        📞 <strong>Contact Deepam Financial Services</strong>

        <br><br>

        📱 +91 86808 06448<br>
        📧 deepamfinserve@gmail.com

        <br><br>

        <a href="https://wa.me/918680806448"
           target="_blank"
           style="color:#f5821f;font-weight:700;">
           💬 Chat with us on WhatsApp →
        </a>
        `;
    }


    /* HELLO */

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return `
        👋 Hello!

        <br><br>

        Welcome to Deepam Financial Services.

        <br><br>

        You can ask me about our
        <strong>courses, pricing, mutual funds,
        insurance, investing or trading education.</strong>
        `;
    }


    /* DEFAULT */

    return `
    I'm currently able to help with:

    <br><br>

    📚 Stock Market Courses<br>
    💰 Course Pricing<br>
    📈 Mutual Funds &amp; SIP<br>
    🛡️ Insurance<br>
    📊 Investment Planning<br>
    🎓 NISM Preparation<br>
    📞 Contact Information

    <br><br>

    You can also contact our team directly for
    more assistance.
    `;
}


/* SEND MESSAGE */

function dfSendMessage() {

    const message = dfChatInput.value.trim();

    if (!message) return;


    /* USER MESSAGE */

    dfAddMessage(message, "user");

    dfChatInput.value = "";


    /* BOT TYPING DELAY */

    setTimeout(function () {

        const response = dfBotResponse(message);

        dfAddMessage(response, "bot");

    }, 500);

}


/* SEND BUTTON */

dfChatSend.addEventListener("click", dfSendMessage);


/* ENTER KEY */

dfChatInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        dfSendMessage();

    }

});


/* QUICK REPLIES */

function dfQuickReply(type) {

    let question = "";

    if (type === "courses") {
        question = "What courses do you offer?";
    }

    if (type === "prices") {
        question = "What are the course prices?";
    }

    if (type === "mutualfund") {
        question = "Tell me about mutual funds";
    }

    if (type === "insurance") {
        question = "Tell me about insurance";
    }

    if (type === "contact") {
        question = "How can I contact you?";
    }


    dfAddMessage(question, "user");


    setTimeout(function() {

        dfAddMessage(
            dfBotResponse(question),
            "bot"
        );

    }, 400);

}