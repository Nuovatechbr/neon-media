/**
 * @description Gerador dos balões flutuantes de mídias sociais
 * @author Eduardo Marinho
 * @copyright Nuovatech
 * @see nuovatech.com.br
 * @contact nuovatech@outlook.com
 * @version 0.0.1
 */

const url = "/neon-medias/";

var NeonMedias = {

    // Key used to create an unique ID.
    key: null,

    // Default medias used to load the widget.
    medias: [
        {
            media: "facebook",
            click: () => {
                window.open('');
            },
            title: "Follow in facebook.",
        },
        {
            media: "instagram",
            click: () => {
                window.open('mailto:');
            },
            title: "Follow in instagram."
        },
        {
            media: "email",
            click: () => {
                window.open('mailto:');
            },
            title: "Send e-mail."
        },
        {
            media: "phone",
            click: () => {
                window.open('tel:');
            },
            title: "Call to."
        },
        {
            media: "telegram",
            click: () => {
                window.open('');
            },
            title: "Start a talk."
        },
        {
            media: "whatsapp",
            click: () => {
                window.open('https://wa.me/55/?text=Oi', '_blank');
            },
            title: "Start a talk."
        },
    ],

    // Options used to show widget
    options: {
        posX: "right", // Position in horizontal.
        posY: "bottom", // Position in vertical.
        distance: 20 // Space between body and element (5, 10, 10, 20);
    },

    // Sampe of style propiert
    style: {
        action: {
            btnBg: "red",
            btnBgh: "black",
            btnColor: "white"
        },
        medias: {
            btnBg: "red",
            btnBgh: "black",
            btnColor: "white"
        }
    },

    /**
     * Start the widget in page
     * @param {Array} settings settings to control the widget
     */
    start: function (settings = null) {

        // Check if exist a medias defined otherwise load default medias.
        if (settings != null && settings.medias != undefined) {
            this.medias = settings.medias;
        }

        // Check if exist a options defined otherwise load default settings.
        if (settings != null && settings.options != undefined) {
            this.options = settings.options;
        }

        // Generate a unique key based in current time.
        this.key = Date.now();

        // Importa o CSS
        let neonSocialCss = document.createElement("link");
        neonSocialCss.href = url + "assets/css/neon-medias.min.css";
        neonSocialCss.rel = "stylesheet";
        neonSocialCss.type = "text/css";

        document.head.appendChild(neonSocialCss);

        // Create a container to wrap all elements.
        let nmContainer = document.createElement("div");
        nmContainer.classList.add("nm-container", "nm-pos-" + this.options.posY + "-" + this.options.posX + "-" + this.options.distance);
        nmContainer.id = "nm-container-" + this.key;
        document.body.appendChild(nmContainer);

        // Create a container to action button.
        let nmContainerAction = document.createElement("div");
        nmContainerAction.classList.add("nm-container-action-" + this.key);
        nmContainer.appendChild(nmContainerAction);

        // Create a button to show all medias.
        let nmBtnAction = document.createElement("button");
        nmBtnAction.classList.add("nm-btn-action", "nm-icon-chat");
        nmBtnAction.id = "nm-btn-action-" + this.key;
        nmBtnAction.title = "Exibir os canais de atendimento";
        nmBtnAction.type = "button";
        nmBtnAction.addEventListener("click", () => {
            NeonMedias.toogle();
        });

        // Check if exist custom js style otherwise nothing changes.
        if (settings != null && settings.style != undefined) {
            if (settings.style.action != undefined) {
                nmBtnAction.style.backgroundColor = settings.style.action.btnBg;
                nmBtnAction.style.color = settings.style.action.btnColor;
            }
        }
        nmContainerAction.appendChild(nmBtnAction);

        // Create the navigation to show all media buttons.
        let nmContainerMedia = document.createElement("nav");
        nmContainerMedia.classList.add("nm-container-media");
        nmContainerMedia.id = "nm-container-media-" + this.key;
        nmContainer.appendChild(nmContainerMedia);

        // Check the size of medias to create the float buttons.
        if (this.medias.length > 0) {

            this.medias.forEach(channel => {

                let nmBtnMedia = document.createElement("button");
                nmBtnMedia.classList.add("nm-btn-media", "nm-icon-" + channel.media);
                if (channel.click != undefined) {
                    nmBtnMedia.addEventListener("click", function () {
                        channel.click();
                    });
                }
                nmBtnMedia.title = channel.title;
                nmBtnMedia.type = "button";

                // Check if exist custom js style otherwise nothing changes.
                if (settings != null && settings.style != undefined) {
                    if (settings.style.medias != null) {
                        nmBtnMedia.style.backgroundColor = settings.style.medias.btnBg;
                        nmBtnMedia.style.color = settings.style.medias.btnColor;
                    }
                }
                nmContainerMedia.appendChild(nmBtnMedia);

            });
        } else {
            console.warn("NeonMedias.start() => The media param is not an array.");
        }
    },

    /**
     * Contol of show the element
     */
    toogle: function () {

        let nmContanerMedia = document.getElementById("nm-container-media-" + this.key);
        nmContanerMedia.classList.toggle("active");

        let nmBtnAction = document.getElementById("nm-btn-action-" + this.key);
        if (nmBtnAction.classList.contains("nm-icon-chat")) {
            nmBtnAction.classList.remove("nm-icon-chat");
            nmBtnAction.classList.add("nm-icon-cross", "active");
        } else {
            nmBtnAction.classList.remove("nm-icon-cross", "active");
            nmBtnAction.classList.add("nm-icon-chat");
        }
    }
}