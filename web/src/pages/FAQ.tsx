import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const faqData = [
    {
      question: "How do I check the status of my order?",
      answer:
        "To check the status of your order, log into your account, and go to the My Orders section to get all the information.",
    },
    {
      question: "How do I check the status of my order?",
      answer:
        "To check the status of your order, log into your account, and go to the My Orders section to get all the information.",
    },
    {
      question: "How do I check the status of my order?",
      answer:
        "To check the status of your order, log into your account, and go to the My Orders section to get all the information.",
    },
    {
      question: "How do I check the status of my order?",
      answer:
        "To check the status of your order, log into your account, and go to the My Orders section to get all the information.",
    },
    // Add more FAQ items here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex flex-col pt-16">
      <main className="flex-grow container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-orange-500 mb-2">FAQ</h1>
            <p className="text-emerald-600">Frequently Asked Questions</p>
          </div>

          <div className="space-y-6">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <button
        className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-emerald-600">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-orange-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-orange-500" />
        )}
      </button>
      {isOpen && <div className="px-6 pb-6 text-gray-700">{answer}</div>}
    </div>
  );
};

export default FAQ;
