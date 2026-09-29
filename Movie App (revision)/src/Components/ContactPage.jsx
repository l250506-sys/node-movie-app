import React from "react";

export default function ContactPage(){

    function handleSubmit(formData){
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        console.log({
            name,
            email,
            message
        });

        alert("Message sent successfully!");
    }

    return (
        <main className="contact-main">
            <h1>Contact Us</h1>

            <form action={handleSubmit} className="contact-form">
                
                <fieldset>
                    <legend>Your Information</legend>

                    <label>
                        Name
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Your name"
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input 
                            type="email"
                            name="email"
                            placeholder="Your email"
                            required
                        />
                    </label>
                </fieldset>

                <fieldset>
                    <legend>Message</legend>

                    <label>
                        Your Message
                        <textarea
                            name="message"
                            rows="6"
                            placeholder="Write your message..."
                            required
                        />
                    </label>
                </fieldset>

                <button type="submit">Send Message</button>

            </form>
        </main>
    );
}