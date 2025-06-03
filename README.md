ตัว Backend Url ที่ผม Deploy
assignment_api.arnupap-sukserm.com

ผม Test จากการที่ผมลองยิงผ่าน Postman (ผมใส่ตัว Postman คร่าวๆ มาไว้ด้วยครับผม)
postman.test.json


Backend
หลักๆ จะมี

Modules: Nest.js จัดโครงสร้างแอปพลิเคชันเป็น Modules ซึ่งช่วยในการจัดระเบียบโค้ดตามคุณสมบัติหรือโดเมน ทำให้โค้ดมีความเป็นโมดูลาร์และบำรุงรักษาง่ายขึ้น.
Controllers: ทำหน้าที่จัดการกับ Incoming Requests และกำหนด Route สำหรับ Endpoint ต่างๆ โดยจะเรียกใช้ Service เพื่อประมวลผล Logic.
Services: เป็นที่อยู่ของ Business Logic หลักของแอปพลิเคชัน โดยจะโต้ตอบกับ Data Source (เช่น ฐานข้อมูล) และเตรียมข้อมูลสำหรับ Controller.
Database Integration: ใช้ TypeORM ซึ่งเป็น ORM (Object-Relational Mapper) สำหรับ TypeScript ที่ช่วยให้สามารถโต้ตอบกับฐานข้อมูล PostgreSQL ได้อย่างง่ายดายผ่านการเขียนโค้ด TypeScript แทนที่จะเขียน SQL โดยตรง.
Authentication & Authorization: ใช้ Passport.js ร่วมกับ JWT (JSON Web Tokens) เพื่อจัดการการยืนยันตัวตนและการอนุญาตสิทธิ์การเข้าถึง API.
Configuration Management: ใช้ @nestjs/config และ dotenv ในการจัดการ Environment Variables ทำให้สามารถปรับเปลี่ยนการตั้งค่าแอปพลิเคชันได้ง่ายในสภาพแวดล้อมที่ต่างกัน.
Logging: ใช้ Winston ร่วมกับ nest-winston สำหรับการบันทึก Log ของแอปพลิเคชัน ช่วยในการ Debugging และ Monitoring.


Libraries และ Packages ที่ใช้งาน

@nestjs/common : แพ็กเกจพื้นฐานของ Nest.js ที่รวมถึง Core Modules, Decorators, และ Utilities ที่จำเป็นสำหรับการพัฒนาแอปพลิเคชัน Nest.js.
@nestjs/config : โมดูลสำหรับจัดการ Configuration หรือ Environment Variables ในแอปพลิเคชัน Nest.js.
@nestjs/core : Core ของ Nest.js framework ที่จัดการกับการสร้างแอปพลิเคชัน, Dependency Injection, และ Life cycle hooks.
@nestjs/passport : Integration ของ Passport.js สำหรับ Nest.js เพื่อจัดการ Authentication และ Authorization strategies.
@nestjs/platform-express : โมดูลสำหรับ Nest.js ที่ช่วยให้สามารถใช้งาน Express.js เป็น HTTP server platform ได้.
@nestjs/typeorm : Integration ของ TypeORM สำหรับ Nest.js ช่วยให้การจัดการฐานข้อมูลเป็นไปอย่างราบรื่น.
class-transformer : ไลบรารีสำหรับแปลง Plain JavaScript Objects ไปยัง Classes และในทางกลับกัน ซึ่งมักใช้ร่วมกับ class-validator เพื่อการทำ Validation.
class-validator : ไลบรารีสำหรับ Validation ของ Class Objects โดยใช้ Decorators, ช่วยให้การตรวจสอบข้อมูลที่เข้ามาใน API เป็นไปอย่างง่ายดาย.
dotenv : ช่วยในการโหลด Environment Variables จากไฟล์ .env เข้าสู่ process.env.
jsonwebtoken : ไลบรารีสำหรับสร้างและยืนยัน JSON Web Tokens (JWT) ซึ่งใช้ในการ Authentication.
nest-winston : Integration ของ Winston logger สำหรับ Nest.js ทำให้สามารถใช้ Winston เป็น Logging provider ได้.
passport : Middleware สำหรับ Authentication ที่ยืดหยุ่นและโมดูลาร์สำหรับ Node.js.
passport-jwt : Passport strategy สำหรับการ Authentication ด้วย JWT.
pg : Node.js driver สำหรับ PostgreSQL database.
typeorm : Object-Relational Mapper (ORM) สำหรับ TypeScript และ JavaScript ที่รองรับฐานข้อมูลหลากหลาย รวมถึง PostgreSQL.
winston : ไลบรารีสำหรับ Logging ที่มีประสิทธิภาพสูงและปรับแต่งได้.

