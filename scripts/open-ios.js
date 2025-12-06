import { platform } from 'os';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const iosWorkspacePath = path.join(rootDir, 'ios', 'App', 'App.xcworkspace');

const currentPlatform = platform();

console.log('\n📱 Открытие iOS проекта...\n');

if (currentPlatform === 'darwin') {
  // macOS - можно открыть Xcode
  try {
    await execAsync(`open "${iosWorkspacePath}"`);
    console.log('✅ Xcode открыт успешно!');
  } catch (error) {
    console.error('❌ Ошибка при открытии Xcode:', error.message);
    process.exit(1);
  }
} else {
  // Windows или Linux
  console.log('⚠️  Xcode доступен только на macOS!\n');
  console.log('📋 Варианты работы с iOS на Windows:\n');
  console.log('1️⃣  Использовать macOS (рекомендуется):');
  console.log('   - Физический Mac');
  console.log('   - Mac в облаке (MacStadium, AWS EC2 Mac)');
  console.log('   - Виртуальная машина macOS (требует лицензию)\n');
  
  console.log('2️⃣  Облачная сборка:');
  console.log('   - GitHub Actions (бесплатно для публичных репозиториев)');
  console.log('   - Codemagic');
  console.log('   - AppCircle\n');
  
  console.log('3️⃣  Разработка на Windows:');
  console.log('   - Разрабатывайте веб-версию: pnpm dev');
  console.log('   - Собирайте проект: pnpm sync');
  console.log('   - Тестируйте в браузере');
  console.log('   - Для финальной сборки iOS используйте macOS\n');
  
  console.log('📂 Путь к iOS проекту:');
  console.log(`   ${iosWorkspacePath}\n`);
  
  console.log('💡 Совет: Вы можете синхронизировать проект (pnpm sync)');
  console.log('   и затем открыть папку ios/App в Xcode на Mac вручную.\n');
  
  // Попытка открыть папку в проводнике Windows
  if (currentPlatform === 'win32') {
    const iosAppPath = path.join(rootDir, 'ios', 'App');
    const iosAppPathWin = iosAppPath.replace(/\//g, '\\');
    try {
      // Используем spawn для более надёжного открытия на Windows
      spawn('explorer', [iosAppPathWin], { 
        detached: true, 
        stdio: 'ignore' 
      }).unref();
      console.log('✅ Папка iOS открыта в проводнике Windows');
      console.log(`   Путь: ${iosAppPathWin}`);
    } catch (error) {
      console.log('ℹ️  Не удалось открыть папку автоматически');
      console.log(`   Попробуйте открыть вручную: ${iosAppPathWin}`);
    }
  }
}

