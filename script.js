document.getElementById('activate-bot-btn').addEventListener('click', function() {
    const API_URL = 'https://eeed132f-6427-4daf-a3c0-bff6b2e643df-00-1jhxknu2jadpm.spock.replit.dev/api/activate_bot'; 
    
    const button = this;
    const statusElement = document.getElementById('bot-status');
 button.textContent = 'جاري الاتصال بالبوت... ⏳';
    button.disabled = true;
    statusElement.textContent = 'جاري إرسال طلب التفعيل إلى الخادم...';
    
      axios.post(API_URL, {
       user_id: "ArkamLahlou-Dashboard",
        action: "start_scheduled_publish"
    })
    .then(response => {
        
        const message = response.data.message || 'تم التفعيل بنجاح.';
        
        statusElement.textContent = `✅ تم التفعيل بنجاح! ${message}`;
        button.textContent = 'تم التفعيل (قيد التشغيل) ✔️';
        console.log('رسالة الخادم:', response.data);
    })
    .catch(error => {
       
        let errorMessage = 'فشل التفعيل! تأكد من تشغيل البوت.';
        
        if (error.response) {
            
            errorMessage = `❌ خطأ في الخادم (${error.response.status}): ${error.response.data.message || 'لا يوجد رسالة خطأ.'}`;
        } else if (error.request) {
           
            errorMessage = '❌ خطأ في الشبكة. هل البوت على Replit ما زال يعمل؟';
        }
        
        statusElement.textContent = errorMessage;
        button.textContent = 'فشل التفعيل! إعادة المحاولة؟';
        button.disabled = false; // نتيح للمستخ
