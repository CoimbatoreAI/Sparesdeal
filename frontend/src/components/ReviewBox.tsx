import { motion } from "framer-motion";
import { Star, MessageCircle, User, Quote } from "lucide-react";

const reviews = [
    {
        name: "Vikram Shah",
        date: "2 days ago",
        rating: 5,
        comment: "Excellent service and high-quality industrial parts. Same day shipping was a life saver for our production unit!",
        location: "Coimbatore"
    },
    {
        name: "Rahul Deshmukh",
        date: "1 week ago",
        rating: 5,
        comment: "The SS wire ropes are top notch. Very professional approach and GST invoices were provided promptly.",
        location: "Mumbai"
    },
    {
        name: "Suresh Menon",
        date: "3 weeks ago",
        rating: 4,
        comment: "Best pricing for bulk O-rings in the market. Highly recommended for industrial traders.",
        location: "Chennai"
    }
];

const ReviewBox = () => {
    return (
        <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Stats */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 uppercase tracking-tighter leading-none">
                            Trusted by <br /><span className="text-secondary">Thousands</span>
                        </h2>
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                            <div className="text-6xl font-black text-foreground">4.9</div>
                            <div>
                                <div className="flex gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Average Rating</p>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-secondary text-secondary-foreground inline-block">
                            <div className="flex items-center gap-3">
                                <MessageCircle className="w-6 h-6" />
                                <span className="text-lg font-bold">2,500+ Verified Reviews</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Review grid */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.slice(0, 2).map((review, i) => (
                            <motion.div
                                key={review.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="p-8 rounded-3xl bg-background border border-border shadow-2xl relative group"
                            >
                                <Quote className="w-10 h-10 text-secondary/10 absolute top-6 right-8 group-hover:text-secondary/20 transition-colors" />
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                        <User className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">{review.name}</h4>
                                        <p className="text-xs text-muted-foreground">{review.location} • {review.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground leading-relaxed italic">
                                    "{review.comment}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewBox;
