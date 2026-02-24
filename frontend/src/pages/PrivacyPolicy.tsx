import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-sm md:prose-base dark:prose-invert max-w-none"
                    >
                        <h1 className="text-4xl font-heading font-black mb-4">Privacy Policy</h1>
                        <p className="text-muted-foreground mb-8">Last updated: December 12, 2025</p>

                        <div className="space-y-6 text-foreground/80 leading-relaxed">
                            <p>
                                <a href="https://sparesdeal.com/" className="text-secondary hover:underline">https://sparesdeal.com/</a> operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). <a href="https://sparesdeal.com/" className="text-secondary hover:underline">https://sparesdeal.com/</a> is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.
                            </p>

                            <p>
                                Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
                            </p>

                            <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Personal Information We Collect or Process</h2>
                            <p>
                                When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal information, including inferences drawn from this personal information, depending on how you interact with the Services, where you live, and as permitted or required by applicable law:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Contact details including your name, address, billing address, shipping address, phone number, and email address.</li>
                                <li>Financial information including credit card, debit card, and financial account numbers, payment card information, financial account information, transaction details, form of payment, payment confirmation and other payment details.</li>
                                <li>Account information including your username, password, security questions, preferences and settings.</li>
                                <li>Transaction information including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.</li>
                                <li>Communications with us including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
                                <li>Device information including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
                                <li>Usage information including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
                            </ul>

                            <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Personal Information Sources</h2>
                            <p>We may collect personal information from the following sources:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Directly from you including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information;</li>
                                <li>Automatically through the Services including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies;</li>
                                <li>From our service providers including when we engage them to enable certain technology and when they collect or process your personal information on our behalf;</li>
                                <li>From our partners or other third parties.</li>
                            </ul>

                            <h2 className="text-2xl font-heading font-bold mt-8 mb-4">How We Use Your Personal Information</h2>
                            <p>Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:</p>
                            <ul className="list-disc pl-6 space-y-4">
                                <li><strong>Provide, Tailor, and Improve the Services.</strong> We use your personal information to provide you with the Services, including to perform our contract with you, to process your payments, to fulfill your orders, to remember your preferences and items you are interested in, to send notifications to you related to your account, to process purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, to facilitate any returns and exchanges, to enable you to post reviews, and to create a customized shopping experience for you, such as recommending products related to your purchases. This may include using your personal information to better tailor and improve the Services.</li>
                                <li><strong>Marketing and Advertising.</strong> We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you online advertisements for products or services on the Services or other websites, including based on items you previously have purchased or added to your cart and other activity on the Services.</li>
                                <li><strong>Security and Fraud Prevention.</strong> We use your personal information to authenticate your account, to provide a secure payment and shopping experience, detect, investigate or take action regarding possible fraudulent, illegal, unsafe, or malicious activity, protect public safety, and to secure our services. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password or other access details with anyone else.</li>
                                <li><strong>Communicating with You.</strong> We use your personal information to provide you with customer support, to be responsive to you, to provide effective services to you and to maintain our business relationship with you.</li>
                                <li><strong>Legal Reasons.</strong> We use your personal information to comply with applicable law or respond to valid legal process, including requests from law enforcement or government agencies, to investigate or participate in civil discovery, potential or actual litigation, or other adversarial legal proceedings, and to enforce or investigate potential violations of our terms or policies.</li>
                            </ul>

                            <h2 className="text-2xl font-heading font-bold mt-8 mb-4">How We Disclose Personal Information</h2>
                            <p>In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>With Shopify, vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
                                <li>With business and marketing partners to provide marketing services and advertise to you.</li>
                                <li>When you direct, request us or otherwise consent to our disclosure of certain information to third parties.</li>
                                <li>With our affiliates or otherwise within our corporate group.</li>
                                <li>In connection with a business transaction such as a merger or bankruptcy, or to comply with any applicable legal obligations.</li>
                            </ul>

                            <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Relationship with Shopify</h2>
                            <p>
                                The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you. Information you submit to the Services will be transmitted to and shared with Shopify. To learn more about how Shopify uses your personal information, you can visit the Shopify Consumer Privacy Policy.
                            </p>

                            <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Your Rights and Choices</h2>
                            <p>Depending on where you live, you may have rights in relation to your personal information, including the right to access, delete, or correct your information, and the right to portability.</p>

                            <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Contact</h2>
                            <div className="bg-muted p-6 rounded-2xl border border-border">
                                <p className="font-heading font-bold mb-2">Contact Information</p>
                                <p>Phone: +91 7200317756 , +91 97904 57793</p>
                                <p>Email: sparesdeal7@gmail.com</p>
                                <p className="mt-4">Address:<br />No.9/848-3, Kovai Gardens, Pachapalayam,<br />Siruvani Main Road, Coimbatore – 641010, Tamil Nadu, India</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
