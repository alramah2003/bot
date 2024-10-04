// استيراد المكتبات المطلوبة
const { Telegraf, Markup } = require('telegraf');

// إنشاء البوت باستخدام التوكن الخاص بك
const bot = new Telegraf(''); // ضع التوكن الخاص بك هنا

// بيانات الأدمن
const adminEmail = '';
const adminPassword = '';
const adminId = ''; // ضع معرف الأدمن هنا

// كائنات لتخزي// استيراد المكتبات المطلوبة
const { Telegraf, Markup } = require('telegraf');

// إنشاء البوت باستخدام التوكن الخاص بك
const bot = new Telegraf('7818037506:AAGMkbRGAVWyJCGGS50nUsCvcsrrQYbVktk'); // ضع التوكن الخاص بك هنا

// بيانات الأدمن
const adminEmail = 'ahmedalramah500@gmail.com';
const adminPassword = 'a12345678';
const adminId = '1081687625'; // ضع معرف الأدمن هنا

// كائنات لتخزين بيانات المستخدمين وحالاتهم
let users = {}; // لتخزين بيانات المستخدمين
let userState = {}; // لتخزين حالة المستخدمين

// مصفوفات لتخزين البروكسيات والإيميلات المتاحة
let proxies = []; // سيتم تخزين البروكسيات هنا
let emails = []; // سيتم تخزين الإيميلات هنا
let proxyShared = {}; // لمعرفة من اشترى البروكسيات

// كائن لتخزين الرسائل المترجمة
const messages = {
    welcome: {
        ar: 'مرحبًا! يرجى اختيار أحد الخيارات التالية:',
        en: 'Welcome! Please choose one of the following options:',
    },
    mainMenu: {
        ar: 'مرحبًا بك في القائمة الرئيسية! يرجى اختيار أحد الخيارات:',
        en: 'Welcome back to the main menu! Please choose an option:',
    },
    enterEmail: {
        ar: 'يرجى إدخال بريدك الإلكتروني:',
        en: 'Please enter your email:',
    },
    enterPassword: {
        ar: 'الآن، يرجى إدخال كلمة المرور:',
        en: 'Now, please enter your password:',
    },
    incorrectEmail: {
        ar: 'البريد الإلكتروني غير صحيح أو غير موجود. ❌ يرجى المحاولة مرة أخرى.',
        en: 'Incorrect or non-existent email. ❌ Please try again.',
    },
    incorrectPassword: {
        ar: 'كلمة المرور غير صحيحة. ❌ يرجى المحاولة مرة أخرى.',
        en: 'Incorrect password. ❌ Please try again.',
    },
    loggedInAsAdmin: {
        ar: 'لقد قمت بتسجيل الدخول كأدمن! ✅',
        en: 'You are now logged in as Admin! ✅',
    },
    languageChanged: {
        ar: 'تم تغيير اللغة بنجاح! ✅',
        en: 'Language changed successfully! ✅',
    },
    confirmAction: {
        ar: 'هل أنت متأكد أنك تريد القيام بهذا الإجراء؟',
        en: 'Are you sure you want to proceed with this action?',
    },
    chooseOption: {
        ar: 'يرجى اختيار خيار من القائمة.',
        en: 'Please select an option from the menu.',
    },
    helpPrompt: {
        ar: 'كيف يمكنني مساعدتك؟ الرجاء وصف مشكلتك.',
        en: 'How can I assist you? Please describe your issue.',
    },
    loggedOut: {
        ar: 'تم تسجيل الخروج بنجاح.',
        en: 'Logged out successfully.',
    },
    registrationSuccess: {
        ar: 'تم التسجيل بنجاح! 🎉',
        en: 'Registered successfully! 🎉',
    },
    loginSuccess: {
        ar: 'تم تسجيل الدخول بنجاح! ✅',
        en: 'Logged in successfully! ✅',
    },
    passwordResetLinkSent: {
        ar: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.',
        en: 'Password reset link sent to your email.',
    },
    operationCancelled: {
        ar: 'تم إلغاء العملية.',
        en: 'Operation cancelled.',
    },
    proxyPurchased: {
        ar: 'تم شراء البروكسي بنجاح!',
        en: 'Proxy purchased successfully!',
    },
    emailPurchased: {
        ar: 'تم شراء الإيميل بنجاح!',
        en: 'Email purchased successfully!',
    },
    noProxiesAvailable: {
        ar: 'عذرًا، لا توجد بروكسيات متاحة حاليًا.',
        en: 'Sorry, no proxies are currently available.',
    },
    noEmailsAvailable: {
        ar: 'عذرًا، لا توجد إيميلات متاحة حاليًا.',
        en: 'Sorry, no emails are currently available.',
    },
    selectButtonToEdit: {
        ar: 'يرجى اختيار الزر الذي ترغب في تعديله:',
        en: 'Please select the button you wish to edit:',
    },
    selectButtonToDelete: {
        ar: 'يرجى اختيار الزر الذي ترغب في حذفه:',
        en: 'Please select the button you wish to delete:',
    },
    buttonDeleted: {
        ar: 'تم حذف الزر بنجاح!',
        en: 'Button deleted successfully!',
    },
    buttonEdited: {
        ar: 'تم تعديل الزر بنجاح!',
        en: 'Button edited successfully!',
    },
    invalidCommand: {
        ar: 'خيار غير صالح. يرجى المحاولة مرة أخرى.',
        en: 'Invalid command. Please try again.',
    },
};

// كائن لتخزين تسميات الأزرار باللغات المختلفة
const buttonLabels = {
    login: { ar: '🔐 تسجيل الدخول', en: '🔐 Login' },
    register: { ar: '📝 التسجيل', en: '📝 Register' },
    forgotPassword: { ar: '❓ هل نسيت كلمة المرور', en: '❓ Forgot Password' },
    changeLanguage: { ar: '🌐 تغيير اللغة', en: '🌐 Change Language' },
    help: { ar: '❓ المساعدة', en: '❓ Help' },
    buyProxy: { ar: '🛡️ شراء بروكسي', en: '🛡️ Buy Proxy' },
    buyEmails: { ar: '📧 شراء إيميلات', en: '📧 Buy Emails' },
    accountInfo: { ar: 'ℹ️ معلومات الحساب', en: 'ℹ️ Account Info' },
    recharge: { ar: '💳 إعادة الشحن', en: '💳 Recharge' },
    myProxies: { ar: '🛡️ بروكسياتي', en: '🛡️ My Proxies' },
    logout: { ar: '🚪 تسجيل الخروج', en: '🚪 Logout' },
    addButton: { ar: '➕ إضافة زر', en: '➕ Add Button' },
    editButton: { ar: '✏️ تعديل زر', en: '✏️ Edit Button' },
    deleteButton: { ar: '➖ حذف زر', en: '➖ Delete Button' },
    hideButton: { ar: '👁️ إخفاء زر', en: '👁️ Hide Button' }, // إضافة زر إخفاء
    showButton: { ar: '👁️‍🗨️ إظهار زر', en: '👁️‍🗨️ Show Button' }, // إضافة زر إظهار
    addCommands: { ar: '⚙️ إضافة أوامر', en: '⚙️ Add Commands' },
    manageBalance: { ar: '💰 إدارة الرصيد', en: '💰 Manage Balance' },
    manageUsers: { ar: '👥 إدارة المستخدمين', en: '👥 Manage Users' },
    viewReports: { ar: '📊 عرض التقارير', en: '📊 View Reports' },
    manageProxies: { ar: '🛡️ إدارة البروكسيات', en: '🛡️ Manage Proxies' },
    manageEmails: { ar: '📧 إدارة الإيميلات', en: '📧 Manage Emails' },
    helpRequests: { ar: '📥 طلبات المساعدة', en: '📥 Help Requests' },
    back: { ar: '🔙 العودة', en: '🔙 Back' },
    yes: { ar: 'نعم', en: 'Yes' },
    no: { ar: 'لا', en: 'No' },
    backToMainMenu: { ar: '🔙 العودة للقائمة الرئيسية', en: '🔙 Back to Main Menu' },
};

// دالة للحصول على تسمية الزر بناءً على المفتاح واللغة
function getButtonLabel(key, languageCode) {
    console.log(`getButtonLabel called with key: ${key}, languageCode: ${languageCode}`);
    return buttonLabels[key] ? buttonLabels[key][languageCode] : key;
}

// دالة للحصول على لغة المستخدم
function getUserLanguage(ctx) {
    console.log(`getUserLanguage called for user ID: ${ctx.from.id}`);
    return (users[ctx.from.id] && users[ctx.from.id].language) || 'ar';
}

// دالة لإرسال إشعار للأدمن
function notifyAdmin(message, ctx) {
    const username = ctx.from.username ? `@${ctx.from.username}` : 'N/A';
    console.log(`notifyAdmin called with message: ${message}, from user: ${username}`);
    bot.telegram.sendMessage(adminId, `${message}
Username: ${username}
ID: ${ctx.from.id}`);
}

// دالة للتحقق مما إذا كان المستخدم أدمن ومُسجّل الدخول
function isAdmin(ctx) {
    console.log(`isAdmin called for user ID: ${ctx.from.id}`);
    return ctx.from.id.toString() === adminId.toString() && users[ctx.from.id] && users[ctx.from.id].loggedIn;
}

// دالة للتحقق مما إذا كان المستخدم مُسجّل الدخول
function isLoggedIn(ctx) {
    console.log(`isLoggedIn called for user ID: ${ctx.from.id}`);
    return users[ctx.from.id] && users[ctx.from.id].loggedIn;
}

// كائن لتخزين الأزرار المخصصة
let customButtons = {};

// دالة لإرسال قائمة الأزرار المتاحة للأدمن للاختيار
function sendButtonSelection(ctx, action) {
    const languageCode = getUserLanguage(ctx);
    console.log(`sendButtonSelection called with action: ${action}, languageCode: ${languageCode}`);
    const buttons = Object.keys(customButtons).slice(0, 10).map((key) => [getButtonLabel(key, languageCode)]); // عرض 10 أزرار كحد أقصى لتجنب إرباك المستخدم
    if (buttons.length === 0) {
        ctx.reply(messages.invalidCommand[languageCode]);
    } else {
        ctx.reply(
            action === 'edit' ? messages.selectButtonToEdit[languageCode] : messages.selectButtonToDelete[languageCode],
            Markup.keyboard(buttons).resize()
        );
    }
}

// دالة لإضافة الأوامر
function handleAddCommand(ctx) {
    const languageCode = getUserLanguage(ctx);
    console.log(`handleAddCommand called for user ID: ${ctx.from.id}`);
    ctx.reply(
        languageCode === 'ar' ? 'يرجى اختيار الأمر الذي ترغب في إضافته:' : 'Please choose the command you want to add:',
        Markup.keyboard([
            ['شراء بروكسي', 'شراء إيميل'],
            ['إدارة الرصيد', 'عرض التقارير'],
            [getButtonLabel('back', languageCode)]
        ]).resize()
    );
    userState[ctx.from.id] = { step: 'add_command' };
}

// معالج زر "إضافة أوامر"
bot.hears([buttonLabels.addCommands.ar, buttonLabels.addCommands.en], (ctx) => {
    console.log(`Add commands button pressed by user ID: ${ctx.from.id}`);
    if (isAdmin(ctx)) {
        handleAddCommand(ctx);
    } else {
        ctx.reply(messages.invalidCommand[getUserLanguage(ctx)]);
    }
});

// معالج النصوص لإضافة الأوامر
bot.on('text', (ctx) => {
    const state = userState[ctx.from.id];
    console.log(`Text received from user ID: ${ctx.from.id}, state: ${JSON.stringify(state)}`);
    if (state && state.step === 'add_command') {
        const command = ctx.message.text;
        if (customButtons[command]) {
            ctx.reply(messages.invalidCommand[getUserLanguage(ctx)]); // الأمر موجود بالفعل
        } else {
            customButtons[command] = command;
            ctx.reply(
                getUserLanguage(ctx) === 'ar' ? 'تم إضافة الأمر بنجاح!' : 'Command added successfully!'
            );
        }
        delete userState[ctx.from.id]; // إعادة تعيين حالة المستخدم
    }
});

// معالج الأمر /start
bot.start((ctx) => {
    console.log(`/start command received from user ID: ${ctx.from.id}`);
    // إذا كان المستخدم مسجل الدخول، أعده إلى القائمة المناسبة
    if (isLoggedIn(ctx)) {
        if (isAdmin(ctx)) {
            sendAdminMenu(ctx);
        } else {
            sendMainMenu(ctx);
        }
    } else {
        // إنشاء مستخدم جديد إذا لم يكن موجودًا
        if (!users[ctx.from.id]) {
            users[ctx.from.id] = {
                id: ctx.from.id,
                username: ctx.from.username || '',
                email: '',
                password: '',
                balance: 0, // الرصيد الافتراضي
                proxies: [],
                emails: [],
                language: 'ar',
                logs: [],
                helpRequests: [],
                loggedIn: false, // إضافة حالة تسجيل الدخول
            };
            notifyAdmin(`🚀 مستخدم جديد بدأ المحادثة:`, ctx);
        }
        users[ctx.from.id].loggedIn = false; // إعادة تعيين حالة تسجيل الدخول
        users[ctx.from.id].logs.push({ action: 'start', date: new Date() });
        sendWelcomeMenu(ctx);
    }
});

// دالة لإرسال قائمة الترحيب الأساسية
function sendWelcomeMenu(ctx) {
    const languageCode = getUserLanguage(ctx);
    console.log(`sendWelcomeMenu called for user ID: ${ctx.from.id}, languageCode: ${languageCode}`);
    ctx.reply(
        messages.welcome[languageCode],
        Markup.keyboard([
            [getButtonLabel('login', languageCode), getButtonLabel('register', languageCode)],
            [getButtonLabel('forgotPassword', languageCode)],
            [getButtonLabel('changeLanguage', languageCode), getButtonLabel('help', languageCode)]
        ]).resize()
    );
}

// تشغيل البوت
bot.launch();
console.log('Bot has been launched successfully.');ن بيانات المستخدمين وحالاتهم
let users = {}; // لتخزين بيانات المستخدمين
let userState = {}; // لتخزين حالة المستخدمين

// مصفوفات لتخزين البروكسيات والإيميلات المتاحة
let proxies = []; // سيتم تخزين البروكسيات هنا
let emails = []; // سيتم تخزين الإيميلات هنا
let proxyShared = {}; // لمعرفة من اشترى البروكسيات

// كائن لتخزين الرسائل المترجمة
const messages = {
    welcome: {
        ar: 'مرحبًا! يرجى اختيار أحد الخيارات التالية:',
        en: 'Welcome! Please choose one of the following options:',
    },
    mainMenu: {
        ar: 'مرحبًا بك في القائمة الرئيسية! يرجى اختيار أحد الخيارات:',
        en: 'Welcome back to the main menu! Please choose an option:',
    },
    enterEmail: {
        ar: 'يرجى إدخال بريدك الإلكتروني:',
        en: 'Please enter your email:',
    },
    enterPassword: {
        ar: 'الآن، يرجى إدخال كلمة المرور:',
        en: 'Now, please enter your password:',
    },
    incorrectEmail: {
        ar: 'البريد الإلكتروني غير صحيح أو غير موجود. ❌ يرجى المحاولة مرة أخرى.',
        en: 'Incorrect or non-existent email. ❌ Please try again.',
    },
    incorrectPassword: {
        ar: 'كلمة المرور غير صحيحة. ❌ يرجى المحاولة مرة أخرى.',
        en: 'Incorrect password. ❌ Please try again.',
    },
    loggedInAsAdmin: {
        ar: 'لقد قمت بتسجيل الدخول كأدمن! ✅',
        en: 'You are now logged in as Admin! ✅',
    },
    languageChanged: {
        ar: 'تم تغيير اللغة بنجاح! ✅',
        en: 'Language changed successfully! ✅',
    },
    confirmAction: {
        ar: 'هل أنت متأكد أنك تريد القيام بهذا الإجراء؟',
        en: 'Are you sure you want to proceed with this action?',
    },
    chooseOption: {
        ar: 'يرجى اختيار خيار من القائمة.',
        en: 'Please select an option from the menu.',
    },
    helpPrompt: {
        ar: 'كيف يمكنني مساعدتك؟ الرجاء وصف مشكلتك.',
        en: 'How can I assist you? Please describe your issue.',
    },
    loggedOut: {
        ar: 'تم تسجيل الخروج بنجاح.',
        en: 'Logged out successfully.',
    },
    registrationSuccess: {
        ar: 'تم التسجيل بنجاح! 🎉',
        en: 'Registered successfully! 🎉',
    },
    loginSuccess: {
        ar: 'تم تسجيل الدخول بنجاح! ✅',
        en: 'Logged in successfully! ✅',
    },
    passwordResetLinkSent: {
        ar: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.',
        en: 'Password reset link sent to your email.',
    },
    operationCancelled: {
        ar: 'تم إلغاء العملية.',
        en: 'Operation cancelled.',
    },
    proxyPurchased: {
        ar: 'تم شراء البروكسي بنجاح!',
        en: 'Proxy purchased successfully!',
    },
    emailPurchased: {
        ar: 'تم شراء الإيميل بنجاح!',
        en: 'Email purchased successfully!',
    },
    noProxiesAvailable: {
        ar: 'عذرًا، لا توجد بروكسيات متاحة حاليًا.',
        en: 'Sorry, no proxies are currently available.',
    },
    noEmailsAvailable: {
        ar: 'عذرًا، لا توجد إيميلات متاحة حاليًا.',
        en: 'Sorry, no emails are currently available.',
    },
    selectButtonToEdit: {
        ar: 'يرجى اختيار الزر الذي ترغب في تعديله:',
        en: 'Please select the button you wish to edit:',
    },
    selectButtonToDelete: {
        ar: 'يرجى اختيار الزر الذي ترغب في حذفه:',
        en: 'Please select the button you wish to delete:',
    },
    buttonDeleted: {
        ar: 'تم حذف الزر بنجاح!',
        en: 'Button deleted successfully!',
    },
    buttonEdited: {
        ar: 'تم تعديل الزر بنجاح!',
        en: 'Button edited successfully!',
    },
    invalidCommand: {
        ar: 'خيار غير صالح. يرجى المحاولة مرة أخرى.',
        en: 'Invalid command. Please try again.',
    },
};

// كائن لتخزين تسميات الأزرار باللغات المختلفة
const buttonLabels = {
    login: { ar: '🔐 تسجيل الدخول', en: '🔐 Login' },
    register: { ar: '📝 التسجيل', en: '📝 Register' },
    forgotPassword: { ar: '❓ هل نسيت كلمة المرور', en: '❓ Forgot Password' },
    changeLanguage: { ar: '🌐 تغيير اللغة', en: '🌐 Change Language' },
    help: { ar: '❓ المساعدة', en: '❓ Help' },
    buyProxy: { ar: '🛡️ شراء بروكسي', en: '🛡️ Buy Proxy' },
    buyEmails: { ar: '📧 شراء إيميلات', en: '📧 Buy Emails' },
    accountInfo: { ar: 'ℹ️ معلومات الحساب', en: 'ℹ️ Account Info' },
    recharge: { ar: '💳 إعادة الشحن', en: '💳 Recharge' },
    myProxies: { ar: '🛡️ بروكسياتي', en: '🛡️ My Proxies' },
    logout: { ar: '🚪 تسجيل الخروج', en: '🚪 Logout' },
    addButton: { ar: '➕ إضافة زر', en: '➕ Add Button' },
    editButton: { ar: '✏️ تعديل زر', en: '✏️ Edit Button' },
    deleteButton: { ar: '➖ حذف زر', en: '➖ Delete Button' },
    hideButton: { ar: '👁️ إخفاء زر', en: '👁️ Hide Button' }, // إضافة زر إخفاء
    showButton: { ar: '👁️‍🗨️ إظهار زر', en: '👁️‍🗨️ Show Button' }, // إضافة زر إظهار
    addCommands: { ar: '⚙️ إضافة أوامر', en: '⚙️ Add Commands' },
    manageBalance: { ar: '💰 إدارة الرصيد', en: '💰 Manage Balance' },
    manageUsers: { ar: '👥 إدارة المستخدمين', en: '👥 Manage Users' },
    viewReports: { ar: '📊 عرض التقارير', en: '📊 View Reports' },
    manageProxies: { ar: '🛡️ إدارة البروكسيات', en: '🛡️ Manage Proxies' },
    manageEmails: { ar: '📧 إدارة الإيميلات', en: '📧 Manage Emails' },
    helpRequests: { ar: '📥 طلبات المساعدة', en: '📥 Help Requests' },
    back: { ar: '🔙 العودة', en: '🔙 Back' },
    yes: { ar: 'نعم', en: 'Yes' },
    no: { ar: 'لا', en: 'No' },
    backToMainMenu: { ar: '🔙 العودة للقائمة الرئيسية', en: '🔙 Back to Main Menu' },
};

// دالة للحصول على تسمية الزر بناءً على المفتاح واللغة
function getButtonLabel(key, languageCode) {
    console.log(`getButtonLabel called with key: ${key}, languageCode: ${languageCode}`);
    return buttonLabels[key] ? buttonLabels[key][languageCode] : key;
}

// دالة للحصول على لغة المستخدم
function getUserLanguage(ctx) {
    console.log(`getUserLanguage called for user ID: ${ctx.from.id}`);
    return (users[ctx.from.id] && users[ctx.from.id].language) || 'ar';
}

// دالة لإرسال إشعار للأدمن
function notifyAdmin(message, ctx) {
    const username = ctx.from.username ? `@${ctx.from.username}` : 'N/A';
    console.log(`notifyAdmin called with message: ${message}, from user: ${username}`);
    bot.telegram.sendMessage(adminId, `${message}
Username: ${username}
ID: ${ctx.from.id}`);
}

// دالة للتحقق مما إذا كان المستخدم أدمن ومُسجّل الدخول
function isAdmin(ctx) {
    console.log(`isAdmin called for user ID: ${ctx.from.id}`);
    return ctx.from.id.toString() === adminId.toString() && users[ctx.from.id] && users[ctx.from.id].loggedIn;
}

// دالة للتحقق مما إذا كان المستخدم مُسجّل الدخول
function isLoggedIn(ctx) {
    console.log(`isLoggedIn called for user ID: ${ctx.from.id}`);
    return users[ctx.from.id] && users[ctx.from.id].loggedIn;
}

// كائن لتخزين الأزرار المخصصة
let customButtons = {};

// دالة لإرسال قائمة الأزرار المتاحة للأدمن للاختيار
function sendButtonSelection(ctx, action) {
    const languageCode = getUserLanguage(ctx);
    console.log(`sendButtonSelection called with action: ${action}, languageCode: ${languageCode}`);
    const buttons = Object.keys(customButtons).slice(0, 10).map((key) => [getButtonLabel(key, languageCode)]); // عرض 10 أزرار كحد أقصى لتجنب إرباك المستخدم
    if (buttons.length === 0) {
        ctx.reply(messages.invalidCommand[languageCode]);
    } else {
        ctx.reply(
            action === 'edit' ? messages.selectButtonToEdit[languageCode] : messages.selectButtonToDelete[languageCode],
            Markup.keyboard(buttons).resize()
        );
    }
}

// دالة لإضافة الأوامر
function handleAddCommand(ctx) {
    const languageCode = getUserLanguage(ctx);
    console.log(`handleAddCommand called for user ID: ${ctx.from.id}`);
    ctx.reply(
        languageCode === 'ar' ? 'يرجى اختيار الأمر الذي ترغب في إضافته:' : 'Please choose the command you want to add:',
        Markup.keyboard([
            ['شراء بروكسي', 'شراء إيميل'],
            ['إدارة الرصيد', 'عرض التقارير'],
            [getButtonLabel('back', languageCode)]
        ]).resize()
    );
    userState[ctx.from.id] = { step: 'add_command' };
}

// معالج زر "إضافة أوامر"
bot.hears([buttonLabels.addCommands.ar, buttonLabels.addCommands.en], (ctx) => {
    console.log(`Add commands button pressed by user ID: ${ctx.from.id}`);
    if (isAdmin(ctx)) {
        handleAddCommand(ctx);
    } else {
        ctx.reply(messages.invalidCommand[getUserLanguage(ctx)]);
    }
});

// معالج النصوص لإضافة الأوامر
bot.on('text', (ctx) => {
    const state = userState[ctx.from.id];
    console.log(`Text received from user ID: ${ctx.from.id}, state: ${JSON.stringify(state)}`);
    if (state && state.step === 'add_command') {
        const command = ctx.message.text;
        if (customButtons[command]) {
            ctx.reply(messages.invalidCommand[getUserLanguage(ctx)]); // الأمر موجود بالفعل
        } else {
            customButtons[command] = command;
            ctx.reply(
                getUserLanguage(ctx) === 'ar' ? 'تم إضافة الأمر بنجاح!' : 'Command added successfully!'
            );
        }
        delete userState[ctx.from.id]; // إعادة تعيين حالة المستخدم
    }
});

// معالج الأمر /start
bot.start((ctx) => {
    console.log(`/start command received from user ID: ${ctx.from.id}`);
    // إذا كان المستخدم مسجل الدخول، أعده إلى القائمة المناسبة
    if (isLoggedIn(ctx)) {
        if (isAdmin(ctx)) {
            sendAdminMenu(ctx);
        } else {
            sendMainMenu(ctx);
        }
    } else {
        // إنشاء مستخدم جديد إذا لم يكن موجودًا
        if (!users[ctx.from.id]) {
            users[ctx.from.id] = {
                id: ctx.from.id,
                username: ctx.from.username || '',
                email: '',
                password: '',
                balance: 0, // الرصيد الافتراضي
                proxies: [],
                emails: [],
                language: 'ar',
                logs: [],
                helpRequests: [],
                loggedIn: false, // إضافة حالة تسجيل الدخول
            };
            notifyAdmin(`🚀 مستخدم جديد بدأ المحادثة:`, ctx);
        }
        users[ctx.from.id].loggedIn = false; // إعادة تعيين حالة تسجيل الدخول
        users[ctx.from.id].logs.push({ action: 'start', date: new Date() });
        sendWelcomeMenu(ctx);
    }
});

// دالة لإرسال قائمة الترحيب الأساسية
function sendWelcomeMenu(ctx) {
    const languageCode = getUserLanguage(ctx);
    console.log(`sendWelcomeMenu called for user ID: ${ctx.from.id}, languageCode: ${languageCode}`);
    ctx.reply(
        messages.welcome[languageCode],
        Markup.keyboard([
            [getButtonLabel('login', languageCode), getButtonLabel('register', languageCode)],
            [getButtonLabel('forgotPassword', languageCode)],
            [getButtonLabel('changeLanguage', languageCode), getButtonLabel('help', languageCode)]
        ]).resize()
    );
}

// تشغيل البوت
bot.launch();
console.log('Bot has been launched successfully.');