// الملف: script.js

document.getElementById('activate-bot-btn').addEventListener('click', function() {
    
    // ملاحظة: يجب تغيير هذا الرابط لاحقاً ليصبح رابط البوت الفعلي على Heroku
    const apiEndpoint = 'https://YOUR-HEROKU-APP-NAME.herokuapp.com/api/activate_bot'; 
    
    const button = this;
    const statusElement = document.getElementById('bot-status');

    // 1. تغيير حالة الزر أثناء الإرسال
    button.textContent = 'جاري الاتصال بالبوت... ⏳';
    button.disabled = true;
    statusElement.textContent = 'جاري إرسال طلب التفعيل إلى الخادم...';
    
    // 2. إرسال الطلب إلى خادم البوت (الخلفية)
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
        // يمكن إرسال بيانات (مثل ID المستخدم) هنا
    })
    .then(response => {
        if (!response.ok) {
            // التعامل مع الأخطاء التي تأتي من الخادم (مثل 500)
            throw new Error('فشل الاتصال: رمز الخطأ ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        // 3. نجاح الاتصال
        statusElement.textContent = '✅ تم التفعيل بنجاح! البوت بدأ بمراجعة الروابط.';
        button.textContent = 'تم التفعيل (قيد التشغيل) ✔️';
        console.log('رسالة الخادم:', data.message);
        // لا نعيد تفعيل الزر لكون البوت قد بدأ مهمته
    })
    .catch(error => {
        // 4. فشل الاتصال
        statusElement.textContent = '❌ فشل التفعيل: تأكد من تشغيل البوت على الخادم. ' + error.message;
        button.textContent = 'فشل التفعيل! إعادة المحاولة؟';
        button.disabled = false; // نتيح إمكانية المحاولة مرة أخرى
    });
});
