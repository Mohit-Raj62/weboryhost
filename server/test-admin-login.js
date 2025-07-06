const axios = require('axios');

const BASE_URL = 'http://localhost:5002';

async function testAdminLogin() {
  console.log('🧪 Testing admin login...');
  
  try {
    // Test 1: Health check
    console.log('\n1. Testing server health...');
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Server is running:', healthResponse.data);
    
    // Test 2: Admin login
    console.log('\n2. Testing admin login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/admin/login`, {
      email: 'admin@webory.com',
      password: 'admin123'
    });
    
    console.log('✅ Login successful!');
    console.log('🎫 Token received:', loginResponse.data.token ? 'Yes' : 'No');
    console.log('👤 Admin data:', loginResponse.data.admin);
    
    // Test 3: Use token to access protected endpoint
    console.log('\n3. Testing protected endpoint with token...');
    const statsResponse = await axios.get(`${BASE_URL}/api/support-tickets/admin/stats`, {
      headers: { Authorization: `Bearer ${loginResponse.data.token}` }
    });
    
    console.log('✅ Protected endpoint works!');
    console.log('📊 Stats data:', statsResponse.data);
    
    console.log('\n🎉 All tests passed! The admin authentication is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 The server is not running. Please start it with:');
      console.log('   node server.js');
    }
  }
}

testAdminLogin(); 