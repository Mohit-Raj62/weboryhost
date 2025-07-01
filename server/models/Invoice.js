  paymentId: String,
  isRecurring: { type: Boolean, default: false },
  recurrenceInterval: { type: String, enum: ["weekly", "monthly", "yearly", null], default: null },
  nextDueDate: Date,
  reminderSent: { type: Boolean, default: false },
  lastReminderDate: Date,
} 