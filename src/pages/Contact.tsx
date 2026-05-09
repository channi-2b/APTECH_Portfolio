import { useState } from "react";
import emailjs from "@emailjs/browser";
import './Contact.css';

type FormData = {
    name: string;
    email: string;
    message: string;
};

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!formData.name || !formData.email || !formData.message)
            return "Please fill in all fields.";
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(formData.email))
            return "Invalid email format.";
        return "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = validate();
        if (error) { setStatus(error); return; }
        setLoading(true);
        setStatus("");
        try {
            const response = await emailjs.send(
                import.meta.env.VITE_EMAIL_SERVICE_ID,
                import.meta.env.VITE_EMAIL_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAIL_PUBLIC_KEY
            );
            console.log("SUCCESS:", response);

            // Save to MongoDB
            await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                })
            });

            setStatus("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("ERROR:", error);
            setStatus("Failed to send message.");
        }
        setLoading(false);
    };

    return (
        <div className="contact">

            <section className="contact__left">
                <div className="contact__heading">
                    <h1>Contact Me</h1>
                </div>
                <p className="contact__desc">
                    If you want to contact me, simply fill up the form
                    in front of you, and I'll make sure to respond whenever
                    I'm free!
                </p>
            </section>

            <section className="contact__right">
                <form className="contact__form" onSubmit={handleSubmit} noValidate>

                    <div className="form__field">
                        <input
                            type="text"
                            name="name"
                            placeholder="Sender's Name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="form__field">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address (example@email.com)"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="form__field">
                        <textarea
                            name="message"
                            placeholder="Send me a message! (Type your message here.)"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>

                    {status && (
                        <p className={`form__status ${status.includes("success") ? "form__status--ok" : "form__status--err"}`}>
                            {status}
                        </p>
                    )}

                    <button type="submit" className="form__submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Email"}
                    </button>

                </form>
            </section>

        </div>
    );
}