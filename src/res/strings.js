const strings = {
    like: "like",
    comment: "comment",
    commentLike: "comment_like",
    repost: "repost",
    reaction: "reaction",
    follow: "Follow",
    following: "Following",
    follower: "Follower",
    suggestions: "Suggestions",
    feedType: {
        timeline: "Home",
        explore: "Explore",
        likes: "Likes",
        profile: "Profile",
        notification: "Notification",
        repost: "Repost",
        comment: "Comment",
        hashtag: "Hashtag",
    },
    button: {
        post: "Post",
        editProfile: "Edit Profile",
        fetching: "fetching",
        following: "Following",
        follow: "Follow",
        block: "Block",
        blocked: "Blocked",
        unblock: "Unblock",
        requested: "Requested",
        followRequested: "Requested",
        followRejected: "Rejected",
        save: "Save",
    },
    whatshappening: "What's happening?",
    newVersion: "There's a new version available. Please upgrade.",
    header: {
        notifications: "Notifications",
    },
    emptyList: {
        activity: "There are no posts.",
        comment: "There are no comments.",
        userPosts: "No posts here yet.",
        userLikes: "No liked posts here yet.",
        notification: "No notification here yet.",
        hashTag: "There are no posts with this hashtag.",
    },
    noMoreList: {
        activity: "No more posts",
        post: "No more posts",
        comment: "No more comments",
        likes: "No more liked users",
    },
    delete: {
        comment: "Are you sure you want to delete this comment?",
    },
    reportTypes: [
        {
            type: "sexual",
            value: "It's sexually inappropriate",
        },
        {
            type: "violent",
            value: "It's violent or prohibited content",
        },
        {
            type: "offensive",
            value: "It's offensive",
        },
        {
            type: "misleading",
            value: "It's misleading or a scam",
        },
        {
            type: "disagree",
            value: "I disagree with it",
        },
        {
            type: "false",
            value: "It's a false news story",
        },
        {
            type: "spam",
            value: "It's spam",
        },
        {
            type: "others",
            value: "Something else",
        },
    ],
    socialShareType: {
        FACEBOOK: "facebook",
        TWITTER: "twitter",
        MORE: "more",
    },
    timeType: {
        SHORT: 0,
        MEDIUM: 1,
        LONG: 2,
        DATE: 3,
    },
    direction: {
        up: "up",
        down: "down",
        left: "left",
        right: "right",
    },
    navigation: {
        timeline: "Timeline",
        search: "Search",
        notification: "Notifications",
        profile: "My Profile",
    },
    auth: {
        button_login: "Log in",
        button_sign_up: "Get Started",
        button_finish: "Finish",
        button_reset_password: "Reset Password",
        about: "About",
        terms: "Terms",
        privacy: "Privacy",
        phoneEmailUsername: "Phone, email, or username",
        email: "Email",
        password: "Password",
        fullName: "Full Name",
        username: "Username",
        confirmPassword: "Confirm Password",
        eula: "EULA",
        haveAccount: "Have an account?",
        dontHaveAccount: "Don't have an account?",
        resetPassword: {
            title: "Reset Password",
            description:
                "Enter your email below and check your email to access the link to reset your password.",
        },
        newPassword: {
            title: "Reset Your Password",
            description: "Please enter a valid password.\nMust be at least 8 characters.",
        },
    },
    about: {
        title: "About Us",
        header: "Enjoy your privacy.\nWe'll never sell your info.\nTo anyone.\nPeriod.",
        footer: "All are welcome.",
        contents: [
            {
                title: "GET THE WHOLE STORY",
                text: "We’ll never censor news or people because of their beliefs.",
            },
            {
                title: "OWN YOUR LIFE",
                text:
                    "We’ll never sell your info to anyone. You own the content you create, the photos you share and your personal information.",
            },
            {
                title: "DON'T GET MUTED",
                text:
                    "Share without a corporate computer muting your influence by only sending your posts to a fraction of your friends.",
            },
            {
                title: "CHOOSE WHAT YOU SEE",
                text:
                    "Choose what you see. Control what you see by selecting your favorite friends and publishers.",
            },
        ],
    },
    terms: {
        header: "Terms of Use",
        footer: "All are welcome.",
        description: "The terms of use concerning the All Social web site.",
        contents: [
            {
                title: "Contents",
                text:
                    'Welcome to AllSocial. The AllSocial website (the "Site") is comprised of various web pages operated by All Social ("All Social") and the sponsoring organization All Social, Inc. For the purposes of this Terms of Use, unless otherwise noted, all references to All Social include AllSocial and All Social, Inc. AllSocial is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein (the "Terms"). Your use of AllSocial constitutes your agreement to all such Terms. Please read these terms carefully, and keep a copy of them for your reference. If you are under thirteen (13) years of age, you may not use AllSocial. AllSocial does not knowingly collect, either online or offline, personal information from persons under the age of thirteen. If you are over 13 years of age but under 18, you may use AllSocial only with permission and supervision of a parent or guardian.',
            },
            {
                title: "Privacy",
                text:
                    "Your use of AllSocial is subject to All Social's Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.",
            },
            {
                title: "Electronic Communications",
                text:
                    "Visiting AllSocial or sending emails to All Social constitutes electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications that we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communications be in writing.",
            },
            {
                title: "Your account",
                text:
                    "If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. You may not assign or otherwise transfer your account to any other person or entity. You acknowledge that All Social is not responsible for third party access to your account that results from theft or misappropriation of your account. All Social and its associates reserve the right to refuse or cancel service, terminate accounts, or remove or edit content in our sole discretion.\n\nAll Social does not knowingly collect, either online or offline, personal information from persons under the age of thirteen. If you are under 18, you may use AllSocial only with permission and supervision of a parent or guardian.",
            },
            {
                title: "Links to third party sites/Third party services",
                text:
                    'AllSocial may contain links to other websites ("Linked Sites"). The Linked Sites are not under the control of All Social and All Social is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates toa Linked Site. All Social is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by All Social of the site or any association with its operators.\n\nCertain services made available via AllSocial are delivered by third party sites and organizations. By using any product, service or functionality originating from the AllSocial domain, you hereby acknowledge and consent that All Social may share such information and data with any third party with whom All Social has a contractual relationship to provide the requested product, service or functionality on behalf of AllSocial users and customers.',
            },
            {
                title: "No unlawful or prohibited use/Intellectual Property",
                text:
                    "You are granted a non-exclusive, non-transferable, revocable license to access and use AllSocial strictly in accordance with these terms of use. As a condition of your use of the Site, you warrant to All Social that you will not use the Site for any purpose that is unlawful or prohibited by these Terms. You may not use the Site in any manner which could damage, disable, overburden, or impair the Site or interfere with any other party's use and enjoyment of the Site.You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site.\n\nAll content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of All Social or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends or other restrictions contained in any such content and will not make any changes thereto.\n\nYou will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works, or in any way exploit any of the content, in whole or in part, found on the Site. All Social content is not for resale. Your use of the Site does not entitle you to make any unauthorized use of any protected content, and in particular you will not delete or alter any proprietary rights or attribution notices in any content. You will use protected content solely for your personal use, and will make no other use of the content without the express written permission of All Social and the copyright owner. You agree that you do not acquire any ownership rights in any protected content. We do not grant you any licenses, express or implied, to the intellectual property of All Social or our licensors except as expressly authorized by these Terms.",
            },
            {
                title: "Use of communication services",
                text:
                    "The Site may contain bulletin board services, chat areas, news groups, forums, communities, personal web pages, calendars, and/or other message or communication facilities designed to enable you to communicate with the public at large or with a group (collectively, \"Communication Services\"), and you agree to use the Communication Services only to post, send and receive messages and material that are proper and related to the particular Communication Service.\n\nBy way of example, and not as a limitation, you agree that when using a Communication Service, you will not: defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as rights of privacy and publicity) of others; publish, post, upload, distribute or disseminate any inappropriate, profane, defamatory, infringing, obscene, indecent or unlawful topic, name, material or information; upload files that contain software or other material protected by intellectual property laws (or by rights of privacy of publicity) unless you own or control the rights thereto or have received all necessary consents; upload files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of another's computer; advertise or offer to sell or buy any goods or services for any business purpose, unless such Communication Service specifically allows such messages; conduct or forward surveys, contests, pyramid schemes or chain letters; download any file posted by another user of a Communication Service that you know, or reasonably should know, cannot be legally distributed in such manner; falsify or delete any author attributions, legal or other proper notices or proprietary designations or labels of the origin or source of software or other material contained in a file that is uploaded, restrict or inhibit any other user from using and enjoying the Communication Services; violate any code of conduct or other guidelines which may be applicable for any particular Communication Service; harvest or otherwise collect information about others, including e-mail addresses, without their consent; violate any applicable laws or regulations.\n\nAll Social has no obligation to monitor the Communication Services. However, All Social reserves the right to review materials posted to a Communication Service and to remove any materials in its sole discretion.All Social reserves the right to terminate your access to any or all of the Communication Services at any time without notice for any reason whatsoever.\n\nAll Social reserves the right at all times to disclose any information as necessary to satisfy any applicable law, regulation, legal process or governmental request, or to edit, refuse to post or to remove any information or materials, in whole or in part, in All Social's sole discretion.\n\nAlways use caution when giving out any personally identifying information about yourself or your children in any Communication Service. All Social does not control or endorse the content, messages or information found in any Communication Service and, therefore, All Social specifically disclaims any liability with regard to the Communication Services and any actions resulting from your participation in any Communication Service. Managers and hosts are not authorized All Social spokespersons, and their views do not necessarily reflect those of All Social.\n\nMaterials uploaded to a Communication Service may be subject to posted limitations on usage, reproduction and/or dissemination. You are responsible for adhering to such limitations if you upload the materials.",
            },
            {
                title: "Materials provided to AllSocial or posted on any All Social web page",
                text:
                    'All Social does not claim ownership of the materials you provide to AllSocial (including feedback and suggestions) or post, upload, input or submit to any All Social Site or our associated services (collectively "Submissions"). However, by posting, uploading, inputting, providing or submitting your Submission you are granting All Social, our affiliated companies and necessary sublicensees permission in perpetuity to use your Submission in connection with the operation of their Internet businesses including, without limitation, the rights to: copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate and reformat your Submission; and to publish your name in connection with your Submission. These rights granted to All Social shall continue even if such materials are later removed.\n\nNo compensation will be paid with respect to the use of your Submission, as provided herein. All Social is under no obligation to post or use any Submission you may provide and may remove any Submission at any time in All Social\'s sole discretion. \n\nBy posting, uploading, inputting, providing or submitting your Submission you warrant and represent that you own or otherwise control all of the rights to your Submission as described in this section including, without limitation, all the rights necessary for you to provide, post, upload, input or submit the Submissions.',
            },
            {
                title: "Third Party Accounts",
                text:
                    "You may be able to connect your All Social account to third party accounts. By connecting your All Social account to your third party account, you acknowledge and agree that you are consenting to the continuous release of information about you to others (in accordance with your privacy settings on those third party sites). If you do not want information about you to be shared in this manner, do not use this feature.",
            },
            {
                title: "International Users",
                text:
                    "The Service is controlled, operated and administered by All Social from our offices within the USA. If you access the Service from a location outside the USA, you are responsible for compliance with all local laws. You agree that you will not use the all social Content accessed through AllSocial in any country or in any manner prohibited by any applicable laws, restrictions or regulations.",
            },
            {
                title: "Indemnification",
                text:
                    "You agree to indemnify, defend and hold harmless All Social, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorneys' fees) relating to or arising out of your use of or inability to use the Site or services, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations. All Social reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with all social in asserting any available defenses.",
            },
            {
                title: "Liability disclaimer",
                text:
                    'THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. All Social AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME. \n\nAll Social AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND. All Social AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.\n\nTO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL All Social AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF All Social OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE.',
            },
            {
                title: "Termination/access restriction",
                text:
                    "All Social reserves the right, in its sole discretion, to terminate your access to the Site and the related services or any portion thereof at any time, without notice. To the maximum extent permitted by law, this agreement is governed by the laws of the State of California and you hereby consent to the exclusive jurisdiction and venue of courts located in Santa Clara County, California in all disputes arising out of or relating to the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give effect to all provisions of these Terms, including, without limitation, this section.\n\nYou agree that no joint venture, partnership, employment, or agency relationship exists between you and All Social as a result of this agreement or use of the Site. all social's performance of this agreement is subject to existing laws and legal process, and nothing contained in this agreement is in derogation of All Social's right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by All Social with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of the agreement shall continue in effect.\n\nUnless otherwise specified herein, this agreement constitutes the entire agreement between the user and All Social with respect to the Site and it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between the user and All Social with respect to the Site. A printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. It is the express wish to the parties that this agreement and all related documents be written in English.",
            },
            {
                title: "Changes to Terms",
                text:
                    "All Social reserves the right, in its sole discretion, to change the Terms under which AllSocial is offered. The most current version of the Terms will supersede all previous versions. All Social encourages you to periodically review the Terms to stay informed of our updates.",
            },
            {
                title: "Contact Us",
                text: "All Social welcomes your questions or comments regarding the Terms:\n\n",
                email: "info@AllSocial.com",
            },
            {
                title: "Materials provided to All Social or posted on any All Social web page",
                text:
                    'Any copyrighted material which has not been specifically authorized by the copyright owner is used under the ‘fair use’ exception in Title 17 U.S.C. Section 107 of the U.S. Copyright Law, which permits use of copyrighted content for such purposes as news reporting, criticism and likes, parody, education, and research. Repurposing any material from this site for your own uses may constitute copyright infringement.\n\nAllSocial.com makes no claim of copyright to any material posted by any third parties. As a service provider, we comply with, and are protected under, the Digital Millennium Copyright Act. If you are a legal copyright holder or a designated agent for such holder, and you believe that any material on our website infringes a copyright and falls outside the boundaries of "Fair Use", please send notice that such material available online appears without the authorization of the copyright owner of the material.\n\nAll notices should be directed to us at ',
                email: "info@AllSocial.com",
                text2:
                    ". Once notice of an alleged copyright violation has been provided, we will act expeditiously to investigate, and if appropriate, remove or disable access to the material in question as the sole remedy.",
            },
        ],
    },
    privacy: {
        header: "Privacy Policy",
        footer: "All are welcome.",
        description: "Protecting your private information is our priority.",
        contentText:
            "All Social, Inc. (ASI) is committed to protecting your personal data and we respect your privacy. This privacy policy will let you know how we work with your personal data when you visit our websites, and this policy will discuss your privacy rights and how the law protects you.\n\nSo that you can be fully informed about how and why where using your data, it is important that you review this notice along with any other privacy notices or fair processing notices we may provide when we are processing your personal data. This privacy notice supplements other notices and does not intend to replace them. \n\nClick through the sections below to learn more, and use the Glossary to understand the meaning of some of the terms of this policy.",
        contents: [
            {
                title: "Background",
                content:
                    "This privacy policy will tell you how ASI collects and processes your personal data when you use the website, including data you might provide us during your use. \n\nASI does not knowingly collect data relating to children, as our website is not intended for use by children. Children under 13 years old are not the target audience of this site. By making this site available to the public, we do not intend to solicit personal information from these children. If you are under the age of 13, please do not provide any personal information about yourself to us.",
                subTitle: "Controller",
                subContent:
                    "All Social, Inc. is an Idaho corporation. When we mention “ASI” or “we” or “us” or “our” in this notice, we are referencing All Social, Inc.\n\nAll Social, Inc. is the controller and is responsible for this website and its compliance with regulations, including the General Data Protection Regulation. As controller, we will maintain a record of all processing activities for which we are responsible. Our company is acting as data protection officer (“DPO”) who is responsible for overseeing questions about this privacy notice. If you have any questions about this privacy notice, or wish to exercise any legal rights you have, please contact the DPO using the following details:\n\nFull Name of Legal Entity: All Social, Inc.\nName of DPO: All Social, Inc. \nEmail address: contact@allsocial.com \nPostal address: 601 W Bannock St. Boise, ID 83702 Attn: Data Protection Officer \n\nYou have the right to make a complaint at any time to your supervisory authority. However, we would appreciate the chance to address your concerns before you do so, so please contact us first.",
            },
            {
                title:
                    "What is your personal information and what types of personal information about you do we process?",
                content:
                    "Personal data, or personal information, means any information about an individual from which that person can be identified, directly or indirectly. This might include name, identification number, location, etc. It does not include data where the identity has been removed (anonymous data).\n\nWe may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:\n",
                subContents: [
                    "Identity Data includes first name, last name, username or similar identifier, title, and gender.",
                    "Contact Data includes email address and telephone numbers.",
                    "Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.",
                    "Profile Data includes your username and password, your interests, preferences and feedback.",
                    "Usage Data includes information about how you use our website, products and services.",
                    "Marketing and Communications Data includes your preferences in receiving marketing from us and our third parties and your communication preferences.",
                ],
                content2:
                    "\nWe also collect, use and share Aggregated Data such as statistical or demographic data for any purpose. Aggregated Data may be derived from your personal data but is not legally considered personal data as this data does not directly or indirectly reveal your identity. For example, we may aggregate your Usage Data to calculate the percentage of users accessing a specific website feature. However, if we combine or connect Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this privacy notice.\n\n We do not collect any Special Categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health and genetic and biometric data). Nor do we collect any information about criminal convictions and offenses.\n\n Third-party links - Note that ASI’s website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy notice of every website you visit.",
            },
            {
                title: "What is the source of your personal information?",
                content:
                    "We use different methods to collect data from and about you, including: \n\nDirect interactions. You may give us your Identity and Contact Data by filling in SignUpSettingForm or providing other information via our website. This includes personal data you provide when you use our website, request our services, subscribe to our publications, request marketing to be sent to you, or give us feedback.\n\n Automated technologies or interactions. We may automatically collect Technical Data about your equipment, browsing actions and patterns when you interact with our website. We may collect this personal data by using cookies, server logs and/or will other similar technologies. We may also receive Technical Data about you if you visit other websites employing our cookies. Please see our cookies policy below for further details.\n\nThird parties or publicly available sources. We may receive personal data about you from various third parties and public sources, such as Technical Data from analytics providers or from our social media pages.",
            },
            {
                title: "What do we use your personal data for?",
                content:
                    "We may collect, use, store and transfer different kinds of personal data about you for a variety of purposes:\n\nPurpose/activity: To manage our relationship with you which includes notifying you about changes to our terms or privacy policy\n\nType of data: (a) identity(b) contact(c) profile(d) marketing and communications \n\nLawful basis for processing including basis of legitimate interest: (a) Necessary to comply with a legal obligation (b) Necessary for our legitimate interests (to keep our records updated and to study how clients use our products/services)\n\n Purpose/activity: To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data) Type of data: (a) identity(b) contact(c) technical\n\nLawful basis for processing including basis of legitimate interest: (a) Necessary for our legitimate interests (for running our business, provision of administration and IT services, network security, to prevent fraud and in the context of a business reorganization or group restructuring exercise) (b) Necessary to comply with a legal obligation \n\nPurpose/activity: To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you\n\nType of data: (a) identity(b) contact(c) profile(d) usage(e) marketing and communications(f) technical\n\nLawful basis for processing including basis of legitimate interest: Necessary for our legitimate interests (to study how visitors use our products/services, to develop them, to grow our business and to inform our marketing strategy) \n\nPurpose/activity: To use data analytics to improve our website, products/services, marketing, user relationships and experiences\n\nType of data: (a) technical(b) usage\n\n Lawful basis for processing including basis of legitimate interest: Necessary for our legitimate interests (to define types of users for our products and services, to keep our website updated and relevant, to develop our business and to inform our marketing strategy) \n\nPurpose/activity: To make suggestions and recommendations to you about services that may be of interest to you\n\nType of data: (a) identity(b) contact(c) technical(d) usage(e) profile \n\nLawful basis for processing including basis of legitimate interest: Necessary for our legitimate interests (to develop our products/services and grow our business)\n\nWe may use your Identity, Contact, Technical, Usage and Profile Data to form a view on what we think you may want or need, or what may be of interest to you. This is how we decide which products, services and offers may be relevant for you (marketing purposes).\n\nYou may receive marketing communications from us if you have requested information from us or received services from us and you have not opted out of receiving that marketing.\n\nPlease note that we may process your personal data without your knowledge or consent, in compliance with the above rules, where this is required or permitted by law. \n\nWe will only use your personal data for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose. If you wish to get an explanation as to how the processing for the new purpose is compatible with the original purpose, please contact us.\n\nIf we need to use your personal data for an unrelated purpose, we will notify you and we will explain the legal basis which allows us to do so.",
            },
            {
                title:
                    "What are the legal grounds for our processing of your personal information (including when we share it with others)?",
                content:
                    " We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: \n",
                subContents: [
                    "Where we need to perform services to you through the website.",
                    "Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests",
                    "Where we need to perform services to you through the website.",
                ],
                content2:
                    "\nGenerally we do not rely on consent as a legal basis for processing your personal data other than when sending third party direct marketing communications to you via email or text message. You have the right to withdraw consent to marketing at any time by contacting us:\ncontact@allsocial.com.",
            },
            {
                title: "When do we share your personal information with other organizations?",
                content:
                    "We may have to share your personal data with the parties set out below for the purposes set out in the table above.\n",
                subContents: [
                    "Internal Third Parties, as defined in the Glossary.",
                    "External Third Parties, as defined in the Glossary.",
                    "Third parties to whom we may choose to sell, transfer, or merge parts of our business or our assets. Alternatively, we may seek to acquire other businesses or merge with them. If a change happens to our business, then the new owners may use your personal data in the same way as set out in this privacy notice.",
                ],
                content2:
                    "\nWe require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.",
            },
            {
                title: "How and when can you withdraw your consent?",
                content:
                    "You can ask us or third parties to stop sending you marketing messages at any time by contacting us at contact@allsocial.com. Where you opt out of receiving these marketing messages, this will not apply to personal data provided to us as a result of a service provided to you. The withdrawal of your consent shall not affect the lawfulness of processing based on consent before your withdrawal. \n\nYou can also set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly. For more information about the cookies we use, please see our cookies policy for further details.\n\nWe will work to make sure that withdrawing your consent will be as simple as when you provided it.",
            },
            {
                title: "Is your personal information transferred outside the UK or the EEA?",
                content:
                    "Sharing your personal data may involve transferring your data outside the European Economic Area (EEA). To ensure that your personal data is protected when transferred outside the EEA, a data transfer agreement will be put in place between ASI and the other involved party incorporating the EU’s standard contractual clauses. Many of our external third parties are based outside the European Economic Area (EEA) so their processing of your personal data will involve a transfer of data outside the EEA.\n\n Whenever we transfer your personal data to external third parties based outside of the EEA, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented: \n",
                subContents: [
                    "We will only transfer your personal data to countries that have been deemed to provide an adequate level of protection for personal data by the European Commission.",
                    "Where we use certain service providers, we may use specific contracts approved by the European Commission which give personal data the same protection it has in Europe.",
                    "Where we use providers based in the US, we may transfer data to them if they are part of the Privacy Shield which requires them to provide similar protection to personal data shared between the Europe and the US.",
                ],
                content2:
                    "\nPlease contact us if you want further information on the specific mechanism used by us when transferring your personal data out of the EEA.",
            },
            {
                title: "What should you do if your personal information changes?",
                content:
                    "It is important that personal data we hold about you is accurate. Please give keep us informed of your personal changes.",
            },
            {
                title: "Do you have to provide your personal information to us?",
                content:
                    "Where we need to collect personal data by law, or under the terms of a contract we have with you and you fail to provide that data when requested, we may not be able to perform certain tasks (for example, to provide you with goods or services). In this case, we may have to cancel a product or service you desire from us but we will notify you if this is the case at the time.",
            },
            {
                title: "Data Security",
                content:
                    "We have put in place appropriate security measures to prevent your personal data from being accidentally lost destroyed, damages, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality. \n\nWe have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.",
            },
            {
                title: "For how long is your personal information retained by us?",
                content:
                    "We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. \n\nTo determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.\n\n Details of retention periods for different aspects of your personal data are available in our retention policy which you can request from us by contacting us. In some circumstances you can ask us to delete your data: see Request erasure below for further information. \n\nIn some circumstances we may make your personal data anonymous (so that it can no longer be associated with you) for research or statistical purposes in which case we may use this information indefinitely without further notice to you.",
            },
            {
                title: "What are your rights under data protection laws?",
                content:
                    "Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to: \n",
                subContents: [
                    'Request access to your personal data (commonly known as a "data subject access request"). This enables you to receive a copy of the personal data we hold about you and to check that we are lawfully processing it.',
                    "Request correction of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you provide to us.",
                    "Request erasure of your personal data. This enables you to ask us to delete or remove personal data where there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove your personal data where you have successfully exercised your right to object to processing (see below), where we may have processed your information unlawfully or where we are required to erase your personal data to comply with local law. Note, however, that we may not always be able to comply with your request of erasure for specific legal reasons which will be notified to you, if applicable, at the time of your request.",
                    "Object to processing of your personal data where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing your personal data for direct marketing purposes. In some cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.",
                    "Request restriction of processing of your personal data. This enables you to ask us to suspend the processing of your personal data in the following scenarios: (a) if you want us to establish the data's accuracy; (b) where our use of the data is unlawful but you do not want us to erase it; (c) where you need us to hold the data even if we no longer require it as you need it to establish, exercise or defend legal claims; or (d) you have objected to our use of your data but we need to verify whether we have overriding legitimate grounds to use it.",
                    "Request the transfer of your personal data to you or to a third party. We will provide to you, or a third party you have chosen, your personal data in a structured, commonly used, machine-readable format. Note that this right only applies to automated information which you initially provided consent for us to use or where we used the information to perform a contract with you.",
                    "Withdraw consent at any time where we are relying on consent to process your personal data. However, this will not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your consent, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent",
                ],
                content2:
                    "\nIf you wish to exercise any of the rights set out above, please contact us.\n\nWe may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data (or to exercise any of your other rights). This is a security measure to ensure that personal data is not disclosed to any person who has no right to receive it. We may also contact you to ask you for further information in relation to your request to speed up our response.\n\nWe try to respond to all legitimate requests within one month. Occasionally it may take us longer than a month if your request is particularly complex or you have made a number of requests. In this case, we will notify you and keep you updated. \n\nIf you suffer damage as a result of our failure to comply with certain regulations, you may have the right to compensation.",
            },
            {
                title: "Glossary",
                content:
                    " “Legitimate Interest” means the interest of our business in conducting and managing our business to enable us to give you the best service/product and the best and most secure experience. We make sure we consider and balance any potential impact on you (both positive and negative) and your rights before we process your personal data for our legitimate interests. We do not use your personal data for activities where our interests are overridden by the impact on you (unless we have your consent or are otherwise required or permitted to by law). You can obtain further information about how we assess our legitimate interests against any potential impact on you in respect of specific activities by contacting us. \n\n“Comply with a legal or regulatory obligation” means processing your personal data where it is necessary for compliance with a legal or regulatory obligation that we are subject to. \n\n“Internal third parties” are other companies within ASI acting as joint controllers or processors and who provide IT and system administration services and undertake leadership reporting. \n\n“External third parties” are service providers acting as processors who provide IT and system administration services.",
            },
        ],
        others: [
            {
                title: "COOKIE POLICY",
                content:
                    'All Social, Inc. ("us", "we", or "our") uses cookies to enhance your experience on our sites, and many of our web pages use "cookies".\n\nBy using the Service, you consent to the use of cookies. Our Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, and your choices regarding cookies.',
            },
            {
                title: "What are cookies",
                content:
                    'Cookies are small text files that we place in your computer\'s browser to store your preferences. Cookies, by themselves, do not tell us your email address or other personal information unless you choose to provide this information to us by, for example, registering at one of our sites. Once you choose to provide a web page with personal information, this information may be linked to the data stored in the cookie. A cookie is like an identification card, and can be personal data. It is unique to your computer and can only be read by the server that gave it to you. A cookie file allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you. Cookies can be "persistent" or "session" cookies.',
            },
            {
                title: "How we use cookies",
                content:
                    "We use cookies to understand site usage and to improve the content and offerings on our sites. For example, we may use cookies to personalize your experience on our web pages (e.g. to recognize you by name when you return to our site). We also may use cookies to offer you products and services. \n\nCookies save you time as they help us to remember who you are. Cookies help us to be more efficient. We can learn about what content is important to you and what is not. We can revise or remove web pages that are not of interest and focus our energies on content you want.",
            },
            {
                title: "Your choices regarding cookies",
                content:
                    'By continuing to use our site, you accept our use of cookies and our revised Privacy Policy.\n\nYou can configure your browser to accept all cookies or to alert you every time a cookie is offered by a website\'s server. Most browsers automatically accept cookies. You can set your browser option so that you will not receive cookies and you can also delete existing cookies from your browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.\n\nWe may also use small pieces of software code called "web beacons" or "clear gifs" to collect anonymous and aggregate advertising matrix, such as counting page views, promotion views, or advertising responses. A web beacon is an electronic image, called a single-pixel or clear GIF. Web beacons can recognize certain types of information on a user’s computer, such as a user\'s Cookie number, time and date of a page view, and description of the page where the web beacon is placed. You may render some web beacons unusable if you choose to reject their associated cookies. These web beacons may be used to deliver cookies that conform with our Cookie Policy.',
            },
        ],
    },
    license: {
        header: "End User License Agreement",
        footer: "All are welcome.",
        description: "",
        contentText:
            "Apps made available through the App Store are licensed, not sold, to you. Your license to each App is subject to your prior acceptance of either this Licensed Application End User License Agreement (“Standard EULA”), or a custom end user license agreement between you and the Application Provider (“Custom EULA”), if one is provided. Your license to any Apple App under this Standard EULA or Custom EULA is granted by Apple, and your license to any Third Party App under this Standard EULA or Custom EULA is granted by the Application Provider of that Third Party App. Any App that is subject to this Standard EULA is referred to herein as the “Licensed Application.” The Application Provider or Apple as applicable (“Licensor”) reserves all rights in and to the Licensed Application not expressly granted to you under this Standard EULA.",
        contents: [
            [
                "Scope of License: Licensor grants to you a nontransferable license to use the Licensed Application on any Apple­branded products that you own or control and as permitted by the Usage Rules. Moreover, and anything else in the Usage Rules notwithstanding, you agree to abide by the Licensor’s Terms of Use located",
                "https://allsocial.com/policy/terms",
                "when using the Licensed Application. Without limiting the generality of the foregoing, you agree that Licensor has no tolerance for objectionable content or abusive users and will remove such content, suspend/block such users, report illegal conduct to law enforcement authorities and take any other steps or actions Licensor deems necessary to comply with the Usage Rules, the Terms of Use, this Standard EULA, or applicable laws relative to objectionable content or abusive users. The terms of this Standard EULA will govern any content, materials, or services accessible from or purchased within the Licensed Application as well as upgrades provided by Licensor that replace or supplement the original Licensed Application, unless such upgrade is accompanied by a Custom EULA. Except as provided in the Usage Rules, you may not distribute or make the Licensed Application available over a network where it could be used by multiple devices at the same time. You may not transfer, redistribute or sublicense the Licensed Application and, if you sell your Apple Device to a third party, you must remove the Licensed Application from the Apple Device before doing so. You may not copy (except as permitted by this license and the Usage Rules), reverse­engineer, disassemble, attempt to derive the source code of, modify, or create derivative works of the Licensed Application, any updates, or any part thereof (except as and only to the extent that any foregoing restriction is prohibited by applicable law or to the extent as may be permitted by the licensing terms governing use of any open­sourced components included with the Licensed Application).",
            ],
            "Consent to Use of Data: You agree that Licensor may collect and use technical data and related information—including but not limited to technical information about your device, system and application software, and peripherals—that is gathered periodically to facilitate the provision of software updates, product support, and other services to you (if any) related to the Licensed Application. Licensor may use this information, as long as it is in a form that does not personally identify you, to improve its products or to provide services or technologies to you.",
            "Termination. This Standard EULA is effective until terminated by you or Licensor. Your rights under this Standard EULA will terminate automatically if you fail to comply with any of its terms.",
            'External Services. The Licensed Application may enable access to Licensor’s and/or third­party services and websites (collectively and individually, "External Services"). You agree to use the External Services at your sole risk. Licensor is not responsible for examining or evaluating the content or accuracy of any third­party External Services, and shall not be liable for any such third­party External Services. Data displayed by any Licensed Application or External Service, including but not limited to financial, medical and location information, is for general informational purposes only and is not guaranteed by Licensor or its agents. You will not use the External Services in any manner that is inconsistent with the terms of this Standard EULA or that infringes the intellectual property rights of Licensor or any third party. You agree not to use the External Services to harass, abuse, stalk, threaten or defame any person or entity, and that Licensor is not responsible for any such use. External Services may not be available in all languages or in your Home Country, and may not be appropriate or available for use in any particular location. To the extent you choose to use such External Services, you are solely responsible for compliance with any applicable laws. Licensor reserves the right to change, suspend, remove, disable or impose access restrictions or limits on any External Services at any time without notice or liability to you.',
            'NO WARRANTY: YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT USE OF THE LICENSED APPLICATION IS AT YOUR SOLE RISK. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE LICENSED APPLICATION AND ANY SERVICES PERFORMED OR PROVIDED BY THE LICENSED APPLICATION ARE PROVIDED "AS IS" AND “AS AVAILABLE,” WITH ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND, AND LICENSOR HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH RESPECT TO THE LICENSED APPLICATION AND ANY SERVICES, EITHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES AND/OR CONDITIONS OF MERCHANTABILITY, OF SATISFACTORY QUALITY, OF FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY, OF QUIET ENJOYMENT, AND OF NONINFRINGEMENT OF THIRD­PARTY RIGHTS. NO ORAL OR WRITTEN INFORMATION OR ADVICE GIVEN BY LICENSOR OR ITS AUTHORIZED REPRESENTATIVE SHALL CREATE A WARRANTY. SHOULD THE LICENSED APPLICATION OR SERVICES PROVE DEFECTIVE, YOU ASSUME THE ENTIRE COST OF ALL NECESSARY SERVICING, REPAIR, OR CORRECTION. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES OR LIMITATIONS ON APPLICABLE STATUTORY RIGHTS OF A CONSUMER, SO THE ABOVE EXCLUSION AND LIMITATIONS MAY NOT APPLY TO YOU.',
            "Limitation of Liability. TO THE EXTENT NOT PROHIBITED BY LAW, IN NO EVENT SHALL LICENSOR BE LIABLE FOR PERSONAL INJURY OR ANY INCIDENTAL, SPECIAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, LOSS OF DATA, BUSINESS INTERRUPTION, OR ANY OTHER COMMERCIAL DAMAGES OR LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE LICENSED APPLICATION, HOWEVER CAUSED, REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, OR OTHERWISE) AND EVEN IF LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OF LIABILITY FOR PERSONAL INJURY, OR OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THIS LIMITATION MAY NOT APPLY TO YOU. In no event shall Licensor’s total liability to you for all damages (other than as may be required by applicable law in cases involving personal injury) exceed the amount of fifty dollars ($50.00). The foregoing limitations will apply even if the above stated remedy fails of its essential purpose.",
            "You may not use or otherwise export or re­export the Licensed Application except as authorized by United States law and the laws of the jurisdiction in which the Licensed Application was obtained. In particular, but without limitation, the Licensed Application may not be exported or re­exported (a) into any U.S.­embargoed countries or (b) to anyone on the U.S. Treasury Department's Specially Designated Nationals List or the U.S. Department of Commerce Denied Persons List or Entity List. By using the Licensed Application, you represent and warrant that you are not located in any such country or on any such list. You also agree that you will not use these products for any purposes prohibited by United States law, including, without limitation, the development, design, manufacture, or production of nuclear, missile, or chemical or biological weapons.",
            'The Licensed Application and related documentation are "Commercial Items", as that term is defined at 48 C.F.R. §2.101, consisting of "Commercial Computer Software" and "Commercial Computer Software Documentation", as such terms are used in 48 C.F.R. §12.212 or 48 C.F.R. §227.7202, as applicable. Consistent with 48 C.F.R. §12.212 or 48 C.F.R. §227.7202­1 through 227.7202­4, as applicable, the Commercial Computer Software and Commercial Computer Software Documentation are being licensed to U.S. Government end users (a) only as Commercial Items and (b) with only those rights as are granted to all other end users pursuant to the terms and conditions herein. Unpublished­rights reserved under the copyright laws of the United States.',
            "Except to the extent expressly provided in the following paragraph, this Agreement and the relationship between you and Apple shall be governed by the laws of the State of California, excluding its conflicts of law provisions. You and Apple agree to submit to the personal and exclusive jurisdiction of the courts located within the county of Santa Clara, California, to resolve any dispute or claim arising from this Agreement. If (a) you are not a U.S. citizen; (b) you do not reside in the U.S.; (c) you are not accessing the Service from the U.S.; and (d) you are a citizen of one of the countries identified below, you hereby agree that any dispute or claim arising from this Agreement shall be governed by the applicable law set forth below, without regard to any conflict of law provisions, and you hereby irrevocably submit to the non­exclusive jurisdiction of the courts located in the state, province or country identified below whose law governs:",
        ],
        others: [
            "If you are a citizen of any European Union country or Switzerland, Norway or Iceland, the governing law and forum shall be the laws and courts of your usual place of residence.",
            "Specifically excluded from application to this Agreement is that law known as the United Nations Convention on the International Sale of Goods.",
        ],
    },
    interests: [
        "Art",
        "Beauty",
        "Cats",
        "Celebrities",
        "DIY",
        "Dogs",
        "Entertainment",
        "Faith",
        "Family",
        "Fashion",
        "Fitness",
        "Food",
        "Funny",
        "Healthy Eating",
        "Home/Garden",
        "Inspiring",
        "Lifestyle",
        "Military",
        "Movies/TV",
        "Music",
        "News",
        "Outdoors",
        "Royals",
        "Science",
        "Shopping",
        "Sports",
        "Tech",
        "Travel",
        "Vehicles",
        "Wedding",
        "Wellness",
        "Wildlife",
    ],
    settings: {
        account: "Account",
        inviteFriends: "Invite friends",
        display: "Display",
        about: "About us",
        privacy: "Privacy",
        terms: "Terms of use",
        license: "End User License Agreement",
        signOut: "Log out",
        deleteAccount: "Delete account",
    },
    account: {
        email: "Email",
        username: "Username",
        phone: "Phone",
        password: "Password",
        changePassword: "Change Password",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmNewPassword: "Confirm New Password",
        privateProfile: "Private Profile",
        privateDescription:
            "When your account is private, only people you approve can see your photos and videos on AllSocial. Your existing followers won’t be affected.",
        save: "Save",
        deleteAccount: "Delete Account",
    },
    editProfile: {
        title: "Edit Profile",
        name: "Name",
        bio: "Bio",
        location: "Location",
        website: "Website",
        privateInfo: "Private Information",
        gender: "Gender",
        birth: "Birthday",
        region: "Region",
        save: "Save",
    },
    notificationsSettingsScreen: {
        header: "Notification Settings",
        switchText: "Enable push notifications",
    },
    region: { country: "Country", state: "State" },
    gender: { Male: "male", Female: "female" },
};

export default strings;
