const axios = require('axios');
const mongoose = require('mongoose');
const SupportTicket = require('./models/SupportTicket');

const BASE_URL = 'http://localhost:5002';
const MONGODB_URI = "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory";

async function testTicketCreation() {
  console.log('🧪 Testing Ticket Creation and Storage...');
  
  try {
    // Test 1: Check server health
    console.log('\n1. Checking server health...');
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Server is running');
    
    // Test 2: Check database connection
    console.log('\n2. Checking database connection...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Database connected');
    
    // Test 3: Check existing tickets
    console.log('\n3. Checking existing tickets...');
    const existingTickets = await SupportTicket.countDocuments();
    console.log(`📋 Existing tickets in database: ${existingTickets}`);
    
    // Test 4: Create ticket via API (public route)
    console.log('\n4. Creating ticket via API...');
    const ticketData = {
      subject: 'Test Ticket - API Creation',
      email: 'test@example.com',
      message: 'This is a test ticket created via API to check data storage.',
      priority: 'high'
    };
    
    try {
      const createResponse = await axios.post(`${BASE_URL}/api/support-tickets/create-public`, ticketData);
      console.log('✅ Ticket created via API!');
      console.log('📋 Response:', createResponse.data);
      
      // Test 5: Verify ticket was saved in database
      console.log('\n5. Verifying ticket was saved...');
      const savedTicket = await SupportTicket.findOne({ subject: ticketData.subject });
      if (savedTicket) {
        console.log('✅ Ticket found in database!');
        console.log('🆔 ID:', savedTicket._id);
        console.log('📝 Subject:', savedTicket.subject);
        console.log('📧 Email:', savedTicket.email);
        console.log('🔴 Status:', savedTicket.status);
        console.log('⚡ Priority:', savedTicket.priority);
        console.log('📅 Created:', savedTicket.createdAt);
      } else {
        console.log('❌ Ticket not found in database!');
      }
      
    } catch (error) {
      console.log('❌ API creation failed:', error.response?.data || error.message);
    }
    
    // Test 6: Create ticket directly in database
    console.log('\n6. Creating ticket directly in database...');
    const directTicket = new SupportTicket({
      subject: 'Test Ticket - Direct Database',
      email: 'direct@example.com',
      message: 'This ticket was created directly in the database.',
      priority: 'medium',
      status: 'open'
    });
    
    const savedDirectTicket = await directTicket.save();
    console.log('✅ Direct database creation successful!');
    console.log('🆔 ID:', savedDirectTicket._id);
    console.log('📝 Subject:', savedDirectTicket.subject);
    
    // Test 7: Final count
    console.log('\n7. Final ticket count...');
    const finalCount = await SupportTicket.countDocuments();
    console.log(`📊 Total tickets in database: ${finalCount}`);
    
    // Test 8: Show all tickets
    console.log('\n8. All tickets in database:');
    const allTickets = await SupportTicket.find().sort({ createdAt: -1 });
    allTickets.forEach((ticket, index) => {
      console.log(`${index + 1}. ${ticket.subject} - ${ticket.status} (${ticket.priority})`);
      console.log(`   Email: ${ticket.email}`);
      console.log(`   ID: ${ticket._id}`);
      console.log('');
    });
    
    console.log('\n🎉 Ticket creation and storage test completed!');
    
    if (finalCount > existingTickets) {
      console.log('✅ Data is being stored successfully!');
    } else {
      console.log('❌ Data storage issue detected!');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Server is not running. Start with:');
      console.log('   node server.js');
    }
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

testTicketCreation(); 