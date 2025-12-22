export default [
    {
      id: 1,
      title: "Welcome to Temploy!",
      description: "Thank you for joining Temploy. We're excited to have you on board.",
      createdAt: "2023-10-01T12:00:00.000Z",
      is_read: true,
      has_details: false,
      type: "system"
    },
    {
      id: 2,
      title: "New Job Posted",
      description: "A new job that matches your skills has been posted. Check it out now!",
      createdAt: "2023-10-02T15:30:00.000Z",
      is_read: false,
      has_details: true,
      type: "job",
      action: {
        screen: "JobDetails",
        params: { id: 12345 }
      }
    },
    {
      id: 3,
      title: "Profile Update",
      description: "Your profile has been successfully updated.",
      createdAt: "2023-10-03T09:45:00.000Z",
      is_read: false,
      has_details: false,
      type: "profile"
    },
    {
      id: 4,
      title: "Verify your NID/Passport",
      description: "Please verify your NID/Passport to enhance your account security.",
      createdAt: "2023-10-05T11:10:00.000Z",
      is_read: false,
      type: "verification",
      action: {
        screen: "VerificationScreen",
        params: {}
      }
    },
    {
      id: 5,
      title: "First job order!",
      description: "Congratulations! You have successfully completed your first job order. Keep up the great work!",
      createdAt: "2023-10-06T14:20:00.000Z",
      is_read: true,
      type: "milestone",
      has_details: false
    },
    {
      id: 6,
      title: "Payment Received",
      description: "Your payment for the recent job has been processed and received.",
      createdAt: "2023-10-07T10:05:00.000Z",
      is_read: false,
      type: "order",
      has_details: true,
      action: {
        screen: "OrderCompletionDetails",
        params: { id: 67890 }
      }
    },
    {
      id: 7,
      title: "Security Alert",
      description: "We noticed a new login to your account from an unrecognized device. If this was not you, please change your password immediately.",
      createdAt: "2023-10-08T08:15:00.000Z",
      is_read: false,
      type: "security",
      has_details: false
    },
    {
      id: 8,
      title: "Level Up!",
      description: "Congratulations! You've leveled up to Level 2. Enjoy new perks and opportunities.",
      createdAt: "2023-10-09T10:00:00.000Z",
      is_read: false,
      type: "level",
      has_details: false
    }
  ]