const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World! ppppp');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// استيراد مكتبة mysql2
const mysql = require('mysql2');

// إعداد الاتصال بـ MySQL
const connection = mysql.createConnection({
  host: 'localhost', // عنوان الخادم
  user: 'root', // اسم المستخدم
  password: '', // كلمة المرور
  port : 3006,
});

// الاتصال بالخادم
connection.connect((err) => {
  if (err) {
    console.error('err conn', err.stack);
    return;
  }
  console.log('تم الاتصال بالخادم بنجاح');
});

// إنشاء قاعدة بيانات جديدة
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS myDatabase';

// تنفيذ الاستعلام لإنشاء القاعدة
connection.query(createDatabaseQuery, (err, results) => {
  if (err) {
    console.error('err database', err.stack);
    return;
  }
  console.log('تم إنشاء القاعدة بنجاح');

  // يمكنك الآن استخدام قاعدة البيانات التي تم إنشاؤها
  // على سبيل المثال: استخدام القاعدة الجديدة
  connection.changeUser({ database: 'myDatabase' }, (err) => {
    if (err) {
      console.error('خطأ في تغيير قاعدة البيانات:', err.stack);
      return;
    }
    console.log('تم تغيير قاعدة البيانات إلى myDatabase');

    // يمكن الآن تنفيذ استعلامات أخرى في هذه القاعدة
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
      )
    `;

    // إنشاء جدول
    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('خطأ في إنشاء الجدول:', err.stack);
        return;
      }
      console.log('تم إنشاء الجدول بنجاح');

      // يمكنك الآن إدخال بيانات في الجدول أو إجراء استعلامات أخرى
    });
  });
});

// إغلاق الاتصال بعد إتمام العمليات
connection.end();

