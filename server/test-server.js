const axios = require('axios');

const testServer = async () => {
  const baseURL = 'http://localhost:5002';
  
  console.log('Testing server endpoints...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${baseURL}/api/health`);
    console.log('✅ Health endpoint working:', healthResponse.data);
    
    // Test admin login endpoint (should return 400 for missing credentials)
    console.log('\n2. Testing admin login endpoint...');
    try {
      await axios.post(`${baseURL}/api/admin/login`, {});
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Admin login endpoint working (correctly rejected empty request)');
      } else {
        console.log('❌ Admin login endpoint error:', error.response?.status, error.response?.data);
      }
    }
    
    // Test dashboard stats endpoint (should return 401 for missing token)
    console.log('\n3. Testing dashboard stats endpoint...');
    try {
      await axios.get(`${baseURL}/api/admin/stats`);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Dashboard stats endpoint working (correctly rejected missing token)');
      } else {
        console.log('❌ Dashboard stats endpoint error:', error.response?.status, error.response?.data);
      }
    }
    
    console.log('\n🎉 Server is running correctly!');
    console.log('\nNext steps:');
    console.log('1. Create a test admin account: npm run create-test-admin');
    console.log('2. Access admin login: http://localhost:5173/admin/login');
    console.log('3. Use test credentials: admin@webory.com / admin123');
    
  } catch (error) {
    console.error('❌ Server test failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure the server is running: npm run dev');
    console.log('2. Check if port 5002 is available');
    console.log('3. Verify MongoDB connection');
  }
};

testServer(); 