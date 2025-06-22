import { MessageCircle, Target, Users } from "lucide-react";

function AboutUs() {
  const values = [
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
      title: "Transparent Communication",
      description:
        "We believe every transaction should be a conversation, not a silent purchase.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Community First",
      description:
        "Building relationships between buyers and sellers that go beyond single transactions.",
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: "Fair Pricing",
      description:
        "Empowering customers to find prices that work for their budget and sellers to maintain profitable margins.",
    },
  ];

  return (
    <>
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  SmartCart was born from a simple frustration: why should
                  online shopping be so rigid? In 2023, our founders realized
                  that the human element of negotiation—the back-and-forth that
                  makes shopping personal and fair—had been lost in the digital
                  age.
                </p>
                <p>
                  We built SmartCart to bring back the art of the deal. Our
                  platform uses intelligent algorithms to facilitate real-time
                  negotiations between buyers and sellers, creating win-win
                  scenarios where customers save money and sellers build lasting
                  relationships.
                </p>
                <p>
                  Today, we're proud to be the marketplace where every
                  transaction tells a story of mutual respect and fair value
                  exchange.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <MessageCircle className="w-12 h-12 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">How It Works</h3>
                    <p className="text-blue-100">The SmartCart Difference</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Browse & Discover</h4>
                      <p className="text-sm text-blue-100">
                        Find products with negotiable prices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Start Negotiating</h4>
                      <p className="text-sm text-blue-100">
                        Make offers through our smart chat system
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4 mt-1">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Seal the Deal</h4>
                      <p className="text-sm text-blue-100">
                        Agree on terms and complete your purchase
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every negotiation on our platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 h-full transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
