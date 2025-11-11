// الملف: script.js (على موقع GitHub Pages)

document.getElementById('activate-bot-btn').addEventListener('click', function() {
    
    // 🛑 هذا هو رابط API البوت الحي الذي تم الحصول عليه من Replit
    const API_URL = 'https://eeed132f-6427-4daf-a3c0-bff6b2e643df-00-1jhxknu2jadpm.spock.replit.dev/api/activate_bot'; 
    
    const button = this;
    const statusElement = document.getElementById('bot-status');

    // 1. تغيير حالة الزر أثناء الإرسال
    button.textContent = 'جاري الاتصال بالبوت... ⏳';
    button.disabled = true;
    statusElement.textContent = 'جاري إرسال طلب التفعيل إلى الخادم...';
    
    // 2. استخدام Axios لإرسال طلب POST إلى البوت (الخلفية)
    axios.post(API_URL, {
        // نرسل بعض البيانات البسيطة لتحديد من هو المستخدم (يمكن تطويرها لاحقاً)
        user_id: "ArkamLahlou-Dashboard",
        action: "start_scheduled_publish"
    })
    .then(response => {
        // 3. نجاح الاتصال
        // response.data هي البيانات التي يرسلها خادم Python (Flask)
        const message = response.data.message || 'تم التفعيل بنجاح.';
        
        statusElement.textContent = `✅ تم التفعيل بنجاح! ${message}`;
        button.textContent = 'تم التفعيل (قيد التشغيل) ✔️';
        console.log('رسالة الخادم:', response.data);
    })
    .catch(error => {
        // 4. فشل الاتصال (أخطاء الشبكة، أو أخطاء الخادم 404/500)
        let errorMessage = 'فشل التفعيل! تأكد من تشغيل البوت.';
        
        if (error.response) {
            // إذا كان الخطأ من الخادم (البوت) نفسه
            errorMessage = `❌ خطأ في الخادم (${error.response.status}): ${error.response.data.message || 'لا يوجد رسالة خطأ.'}`;
        } else if (error.request) {
            // إذا كان هناك مشكلة في الاتصال بالشبكة
            errorMessage = '❌ خطأ في الشبكة. هل البوت على Replit ما زال يعمل؟';
        }
        
        statusElement.textContent = errorMessage;
        button.textContent = 'فشل التفعيل! إعادة المحاولة؟';
        button.disabled = false; // نتيح للمستخدم محاولة الضغط مرة أخرى
    });
});
