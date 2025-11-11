document.getElementById('activate-bot-btn').addEventListener('click', function() {
    
    // ملاحظة: يجب تغيير هذا الرابط لاحقاً ليصبح رابط البوت الفعلي على Heroku
    const apiEndpoint = 'https://YOUR-HEROKU-APP-NAME.herokuapp.com/api/activate_bot'; 
    
    const button = this;
    const statusElement = document.getElementById('bot-status');

    // 1. تغيير حالة الزر أثناء الإرسال
    button.textContent = 'جاري الاتصال بالبوت عبر Axios... ⏳';
    button.disabled = true;
    statusElement.textContent = 'جاري إرسال طلب التفعيل إلى الخادم...';
    
    // 2. استخدام Axios لإرسال طلب POST
    axios.post(apiEndpoint, {
        // يمكنك إرسال أي بيانات هنا للبوت، مثل ID المستخدم أو قائمة روابط معينة
        user_id: "your_unique_id",
        action: "start_scheduled_publish"
    })
    .then(response => {
        // 3. نجاح الاتصال (response.data هو محتوى الـ JSON الذي يرسله البوت)
        statusElement.textContent = `✅ تم التفعيل بنجاح! رسالة الخادم: ${response.data.message}`;
        button.textContent = 'تم التفعيل (قيد التشغيل) ✔️';
        console.log('رسالة الخادم:', response.data);
    })
    .catch(error => {
        // 4. فشل الاتصال
        let errorMessage = 'فشل التفعيل! تأكد من تشغيل البوت.';
        if (error.response) {
            errorMessage += ` رمز الحالة: ${error.response.status}. رسالة: ${error.response.data.message}`;
        }
        statusElement.t
