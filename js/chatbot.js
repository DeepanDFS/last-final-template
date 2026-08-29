/* =====================================================
   DEEPAM FINANCIAL SERVICES - CHATBOT
===================================================== */


/* =========================
   GET ELEMENTS
========================= */

const dfChatButton = document.getElementById("df-chat-button");

const dfChatBox = document.getElementById("df-chat-box");

const dfChatClose = document.getElementById("df-chat-close");

const dfChatInput = document.getElementById("df-chat-input");

const dfChatSend = document.getElementById("df-chat-send");

const dfMessages = document.getElementById("df-chat-messages");


/* =========================
   OPEN CHAT
========================= */

dfChatButton.addEventListener("click", function () {

    dfChatBox.style.display = "flex";

    dfChatInput.focus();

});


/* =========================
   CLOSE CHAT
========================= */

dfChatClose.addEventListener("click", function () {

    dfChatBox.style.display = "none";

});


/* =========================
   ADD MESSAGE
========================= */

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


/* =========================
   BOT RESPONSE
========================= */

function dfBotResponse(message) {

    const text = message.toLowerCase();


    /* =========================
       COURSES
    ========================= */

    if (
        text.includes("course") ||
        text.includes("courses") ||
        text.includes("learn") ||
        text.includes("training")
    ) {

        return `
            📚 <strong>Stock Market Courses</strong>

            <br><br>

            We offer structured programs for different
            levels of market learning:

            <br><br>

            • Basics &amp; Equity – <strong>₹2,999</strong><br>
            • Technical Analysis – <strong>₹7,999</strong><br>
            • Futures &amp; Options – <strong>₹6,999</strong><br>
            • Commodity Trading – <strong>₹3,999</strong>

            <br><br>

            ⭐ Complete Stock Market Mastery –
            <strong>₹19,999</strong>

            <br><br>

            👑 Complete + Mentorship –
            <strong>₹29,999</strong>

            <br><br>

            Which course would you like to know more about?
        `;
    }


    /* =========================
       PRICING
    ========================= */

    if (
        text.includes("price") ||
        text.includes("pricing") ||
        text.includes("fee") ||
        text.includes("fees") ||
        text.includes("cost")
    ) {

        return `
            💰 <strong>Course Pricing</strong>

            <br><br>

            Basics &amp; Equity:
            <strong>₹2,999</strong><br>

            Technical Analysis:
            <strong>₹7,999</strong><br>

            Futures &amp; Options:
            <strong>₹6,999</strong><br>

            Commodity Trading:
            <strong>₹3,999</strong>

            <br><br>

            ⭐ Complete Stock Market Mastery:
            <strong>₹19,999</strong>

            <br><br>

            👑 Complete + Mentorship:
            <strong>₹29,999</strong>
        `;
    }


    /* =========================
       MUTUAL FUNDS
    ========================= */

    if (
        text.includes("mutual") ||
        text.includes("sip")
    ) {

        return `
            📈 <strong>Mutual Funds</strong>

            <br><br>

            We provide guidance and educational support
            regarding mutual funds, SIPs and long-term
            financial planning.

            <br><br>

            For personalized requirements, please
            contact our team.
        `;
    }


    /* =========================
       INSURANCE
    ========================= */

    if (
        text.includes("insurance") ||
        text.includes("policy")
    ) {

        return `
            🛡️ <strong>Insurance</strong>

            <br><br>

            We help clients understand different
            insurance products and their role in
            financial planning.

            <br><br>

            Please contact our team for further
            assistance.
        `;
    }


    /* =========================
       INVESTMENT
    ========================= */

    if (
        text.includes("invest") ||
        text.includes("investment") ||
        text.includes("investing")
    ) {

        return `
            📊 <strong>Investment Planning</strong>

            <br><br>

            Investment decisions should consider
            financial goals, time horizon and risk
            tolerance.

            <br><br>

            We can help you understand different
            investment options and financial concepts.

            <br><br>

            <strong>Note:</strong> Investment values can
            go up or down and market-linked investments
            involve risk.
        `;
    }


    /* =========================
       NISM
    ========================= */

    if (
        text.includes("nism") ||
        text.includes("certificate") ||
        text.includes("certification")
    ) {

        return `
            🎓 <strong>NISM</strong>

            <br><br>

            We provide stock market education and
            awareness support, including
            preparation-oriented learning for relevant
            NISM examinations.

            <br><br>

            Please contact us for current program
            details.
        `;
    }


    /* =========================
       TRADING
    ========================= */

    if (
        text.includes("trading") ||
        text.includes("trader")
    ) {

        return `
            📊 <strong>Trading Education</strong>

            <br><br>

            Our trading education covers:

            <br><br>

            • Technical Analysis<br>
            • Price Action<br>
            • Futures &amp; Options<br>
            • Risk Management<br>
            • Practical Market Learning

            <br><br>

            ⚠️ Trading involves significant risk.
            Education does not guarantee profits.
        `;
    }


    /* =========================
       BEGINNER
    ========================= */

    if (
        text.includes("beginner") ||
        text.includes("new") ||
        text.includes("start")
    ) {

        return `
            👋 <strong>New to the Stock Market?</strong>

            <br><br>

            If you are completely new, we recommend
            starting with:

            <br><br>

            📚 <strong>Basics &amp; Equity</strong><br>
            ₹2,999

            <br><br>

            If you want a complete learning journey,
            you can consider:

            <br><br>

            ⭐ <strong>Complete Stock Market Mastery</strong><br>
            ₹19,999
        `;
    }


    /* =========================
       CONTACT
    ========================= */

    if (
        text.includes("contact") ||
        text.includes("phone") ||
        text.includes("whatsapp") ||
        text.includes("talk") ||
        text.includes("call")
    ) {

        return `
            📞 <strong>Contact Us</strong>

            <br><br>

            📱 +91 86808 06448

            <br>

            📧 deepamfinserve@gmail.com

            <br><br>

            <a
                href="https://wa.me/918680806448"
                target="_blank"
                class="df-chat-link"
            >
                💬 Chat with us on WhatsApp →
            </a>
        `;
    }


    /* =========================
       HELLO
    ========================= */

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return `
            👋 Hello!

            <br><br>

            Welcome to
            <strong>Deepam Financial Services.</strong>

            <br><br>

            I can help you with:

            <br><br>

            📚 Courses<br>
            💰 Course Pricing<br>
            📈 Mutual Funds<br>
            🛡️ Insurance<br>
            📊 Investment Planning<br>
            🎓 NISM<br>
            📞 Contact Information
        `;
    }


    /* =========================
       DEFAULT RESPONSE
    ========================= */

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

        You can type a question or select one
        of the options above.
    `;

}


/* =========================
   SEND MESSAGE
========================= */

function dfSendMessage() {

    const message = dfChatInput.value.trim();

    if (!message) {
        return;
    }


    /* USER MESSAGE */

    dfAddMessage(message, "user");

    dfChatInput.value = "";


    /* BOT RESPONSE */

    setTimeout(function () {

        const response = dfBotResponse(message);

        dfAddMessage(response, "bot");

    }, 400);

}


/* =========================
   SEND BUTTON
========================= */

dfChatSend.addEventListener(
    "click",
    dfSendMessage
);


/* =========================
   ENTER KEY
========================= */

dfChatInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            dfSendMessage();

        }

    }
);


/* =========================
   QUICK REPLY
========================= */

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


    if (type === "beginner") {
        question = "I am a beginner";
    }


    if (type === "contact") {
        question = "How can I contact you?";
    }


    /* SHOW USER QUESTION */

    dfAddMessage(
        question,
        "user"
    );


    /* BOT RESPONSE */

    setTimeout(function () {

        dfAddMessage(
            dfBotResponse(question),
            "bot"
        );

    }, 400);

}