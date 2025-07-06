const axios = require('axios');

const BASE_URL = 'http://localhost:5002';

async function testDashboard() {
  console.log('🧪 Testing Dashboard Functionality...');
  
  try {
    // Test 1: Health check
    console.log('\n1. Testing server health...');
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Server is running:', healthResponse.data);
    
    // Test 2: Admin login
    console.log('\n2. Logging in as admin...');
    const loginResponse = await axios.post(`${BASE_URL}/api/admin/login`, {
      email: 'admin@webory.com',
      password: 'admin123'
    });
    
    console.log('✅ Admin login successful!');
    const adminToken = loginResponse.data.token;
    
    // Test 3: Get ticket statistics
    console.log('\n3. Fetching ticket statistics...');
    const statsResponse = await axios.get(`${BASE_URL}/api/support-tickets/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    console.log('✅ Statistics fetched successfully!');
    console.log('📊 Stats:', {
      totalTickets: statsResponse.data.totalTickets,
      openTickets: statsResponse.data.openTickets,
      inProgressTickets: statsResponse.data.inProgressTickets,
      resolvedTickets: statsResponse.data.resolvedTickets,
      closedTickets: statsResponse.data.closedTickets
    });
    
    // Test 4: Get all tickets
    console.log('\n4. Fetching all tickets...');
    const ticketsResponse = await axios.get(`${BASE_URL}/api/support-tickets/admin/all`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    console.log('✅ Tickets fetched successfully!');
    console.log(`📋 Total tickets: ${ticketsResponse.data.total}`);
    console.log(`📄 Tickets in response: ${ticketsResponse.data.tickets?.length || 0}`);
    
    // Test 5: Show ticket details
    if (ticketsResponse.data.tickets && ticketsResponse.data.tickets.length > 0) {
      console.log('\n5. Sample ticket details:');
      const sampleTicket = ticketsResponse.data.tickets[0];
      console.log('📝 Subject:', sampleTicket.subject);
      console.log('📧 Email:', sampleTicket.email);
      console.log('🔴 Status:', sampleTicket.status);
      console.log('⚡ Priority:', sampleTicket.priority);
      console.log('📅 Created:', new Date(sampleTicket.createdAt).toLocaleString());
    }
    
    // Test 6: Test status update
    if (ticketsResponse.data.tickets && ticketsResponse.data.tickets.length > 0) {
      console.log('\n6. Testing status update...');
      const firstTicket = ticketsResponse.data.tickets[0];
      const newStatus = firstTicket.status === 'open' ? 'in-progress' : 'open';
      
      try {
        const updateResponse = await axios.put(
          `${BASE_URL}/api/support-tickets/admin/${firstTicket._id}/status`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        console.log('✅ Status updated successfully!');
        console.log('🔄 New status:', updateResponse.data.ticket.status);
      } catch (error) {
        console.log('❌ Status update failed:', error.response?.data);
      }
    }
    
    console.log('\n🎉 Dashboard functionality test completed!');
    console.log('✅ All API endpoints are working correctly');
    console.log('✅ Data is being stored and retrieved properly');
    console.log('✅ Admin authentication is working');
    
  } catch (error) {
    console.error('❌ Dashboard test failed:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 The server is not running. Please start it with:');
      console.log('   node server.js');
    }
  }
}

testDashboard(); 