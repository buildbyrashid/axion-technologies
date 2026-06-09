import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import pool from "@/lib/db";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let contactInfo = {
    email: "sales@axiontechnology.com",
    phone: "+852 2345 6789",
    whatsapp_number: "+852 2345 6789",
    facebook_url: "",
    twitter_url: "",
    linkedin_url: "",
    instagram_url: "",
  };

  try {
    const [rows]: any = await pool.query(
      "SELECT email, phone, whatsapp_number, facebook_url, twitter_url, linkedin_url, instagram_url FROM footer_settings LIMIT 1"
    );
    if (rows && rows.length > 0) {
      contactInfo = {
        ...contactInfo,
        ...rows[0],
      };
    }
  } catch (err) {
    console.error("Failed to load contact info for navbar:", err);
  }

  return (
    <>
      <Navbar contactInfo={contactInfo} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

