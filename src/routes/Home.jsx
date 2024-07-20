import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../App.css";
import { Widget } from "@typeform/embed-react";
function Home() {
  const MyComponent = () => {
    return (
      <Widget id="odwJ9BYb" style={{ width: "100%", height:"500px"}} className="my-form" />
    );
  };
  return (
    <>
      <Helmet>
        <title>One Health</title>
      </Helmet>
      <div className="scroll-margin-top-header" id="home"></div>
      <section className=" dark:bg-slate-900 w-full bg-[url('/assets/hero1.jpg')] bg-center bg-cover mx-auto px-6 lg:px-12 py-6 lg:py-12 flex flex-col text-lg font-poppins select-none">
        <div className="flex flex-col gap-4 lg:w-2/5">
          <div className="container mx-auto flex gap-4 flex-col items-center backdrop-blur-md bg-white/10 p-6 rounded-2xl">
            <h2 className="font-semibold">Your Health. Your Control.</h2>
            <p>
              One Health is revolutionizing healthcare by putting patients at
              the center. Our Global Medical Record Management System (GMRMS)
              provides a centralized platform for managing your medical
              information, empowering you to take control of your health
              journey.
            </p>
          </div>
          <div className="container mx-auto flex gap-4 flex-col items-center backdrop-blur-md bg-white/10 p-6 rounded-2xl">
            <h2 className="font-semibold">With One Health, you can:</h2>
            <ul className="list-disc">
              <li>Access your complete medical information securely.</li>
              <li>Book appointments with healthcare providers online.</li>
              <li>Share your medical data seamlessly with your consent.</li>
              <li>Manage your insurance information efficiently.</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row justify-center py-6">
          <Link to={"/signup"}>
            <Button variant="contained" size="large">
              Signup
            </Button>
          </Link>
        </div>
      </section>
      <section className="shadow-md shadow-slate-300 dark:shadow-white mx-auto px-6 lg:px-12 py-6 lg:py-12 dark:bg-slate-900 dark:text-slate-300 text-lg flex flex-col gap-6 select-none">
        <div className="flex flex-col gap-4 font-poppins">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="dark:font-light pr-1 text-justify">
            Our mission at One Health is to revolutionize healthcare by
            empowering patients with complete control over their medical data.
            We aim to streamline healthcare delivery by providing a centralized
            platform for managing patient medical information, thereby reducing
            administrative burdens and redundancies. We believe in a healthcare
            system where patients can make informed decisions about their care,
            and where seamless data sharing ensures continuity of care and
            reduces the risk of medical errors.
          </p>
        </div>
        <div className="flex flex-col gap-4 font-poppins">
          <h2 className="text-xl font-semibold">Our Vision</h2>
          <p className="dark:font-light pr-1 text-justify">
            Our vision is to create a world where healthcare is efficient,
            accurate, and patient-centric. We envision a future where every
            patient has equitable access to their medical data, regardless of
            their location, socioeconomic status, or digital literacy. We strive
            to adhere to international medical data standards to ensure seamless
            information exchange across different healthcare systems and
            countries. At One Health, we are committed to safeguarding patient
            data privacy and security, and we continually innovate to meet and
            exceed industry standards in these areas.
          </p>
        </div>
      </section>
      <div className="scroll-margin-top-header" id="services"></div>
      <section className="shadow-md shadow-slate-300 dark:shadow-white mx-auto px-6 lg:px-12 py-6 lg:py-12 dark:bg-slate-900 dark:text-slate-300 text-lg flex flex-col gap-6 select-none">
        <h2 className="font-semibold text-xl">Our Services</h2>
        <ul className=" list-inside flex flex-col items-center justify-center lg:grid grid-cols-3 gap-6 ">
          <li className=" dark:bg-white/5 hover:text-black p-6 rounded-2xl bg-slate-100 flex flex-col gap-4 transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
            <img src="/assets/padlock.png" className="aspect-square w-16" />
            <h3 className="font-semibold text-xl">
              Patient-Centric Data Access and Control
            </h3>
            <p>
              Access your complete medical information securely through your
              personal account. You have the power to grant access to specific
              data to authorized healthcare providers.
            </p>
          </li>
          <li className=" dark:bg-white/5 hover:text-black p-6 rounded-2xl bg-slate-100 flex flex-col gap-4 transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
            <img
              src="/assets/calendersearch.png"
              className="aspect-square w-16"
            />
            <h3 className="font-semibold text-xl">
              Appointment Booking and Discovery
            </h3>
            <p>
              Find the right healthcare provider for your needs. Our system
              facilitates online appointment booking and helps you discover
              recommended doctors or hospitals based on your symptoms or other
              criteria.
            </p>
          </li>
          <li className=" dark:bg-white/5 hover:text-black p-6 rounded-2xl bg-slate-100 flex flex-col gap-4 transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
            <img src="/assets/share.png" className="aspect-square w-16" />
            <h3 className="font-semibold text-xl">Seamless Data Sharing</h3>
            <p>
              Share your medical data seamlessly with your consent. Our system
              eliminates the need for intermediaries and redundant tests,
              streamlining the diagnostic process.
            </p>
          </li>
          <li className=" dark:bg-white/5 hover:text-black p-6 rounded-2xl bg-slate-100 flex flex-col gap-4 transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
            <img src="/assets/insurance.png" className="aspect-square w-16" />
            <h3 className="font-semibold text-xl">Insurance Management</h3>
            <p>
              Manage your insurance information efficiently with our system.
              Hospital management can view and verify patient insurance
              information, improving billing and claims processing.
            </p>
          </li>
          <li className=" dark:bg-white/5 hover:text-black p-6 rounded-2xl bg-slate-100 flex flex-col gap-4 transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
            <img src="/assets/document.png" className="aspect-square w-16" />
            <h3 className="font-semibold text-xl">
              Detailed Medical Record Updates
            </h3>
            <p>
              Keep your medical records up-to-date. Doctors can directly update
              your medical records, including visit details, medical reports,
              prescribed medications, and other relevant information.
            </p>
          </li>
          <li className=" dark:bg-white/5 hover:text-black p-6 rounded-2xl bg-slate-100 flex flex-col gap-4 transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
            <img src="/assets/sharing.png" className="aspect-square w-16" />
            <h3 className="font-semibold text-xl">
              Interoperable Medical Record Sharing
            </h3>
            <p>
              Share your medical history with new healthcare providers,
              regardless of where your previous consultations occurred.
              Eliminating the need to repeat tests, improving diagnostic
              accuracy.
            </p>
          </li>
        </ul>
      </section>
      <div className="scroll-margin-top-header" id="about"></div>
      <section className="shadow-md shadow-slate-300 dark:shadow-white mx-auto px-6 lg:px-12 py-6 lg:py-12 dark:bg-slate-900 dark:text-slate-300 text-lg flex flex-col gap-6 select-none">
        <div className="flex flex-col gap-4 font-poppins">
          <h2 className="text-xl font-semibold">About Us</h2>
          <p className="dark:font-light pr-1 text-justify">
            <span className=" font-medium">One Health</span> is a global medical
            record management system (GMRMS) that aims to revolutionize
            healthcare by providing a centralized platform for managing patient
            medical information. We believe in a patient-centric approach where
            patients have complete control over their medical data. Founded in
            2024, our mission is to improve the efficiency and accuracy of
            medical care worldwide. Our team comprises dedicated professionals
            from diverse backgrounds, including healthcare, technology, and data
            security, who share a common goal - to make healthcare more
            accessible and efficient. We understand the challenges faced by both
            patients and healthcare providers in managing medical information.
            That’s why we’ve designed One Health to be user-friendly, secure,
            and interoperable. Whether you’re a patient looking to manage your
            medical records or a doctor seeking efficient patient data
            management, One Health is here to assist you. At One Health, we’re
            not just about providing services; we’re about building a healthier
            future. Join us on this journey.
          </p>
        </div>
      </section>
      <div className="scroll-margin-top-header" id="contact"></div>
      <section className="shadow-md shadow-slate-300 dark:shadow-white mx-auto px-6 lg:px-12 py-6 lg:py-12 dark:bg-slate-900 dark:text-slate-300 text-lg flex flex-col gap-6 select-none">
        <div className="flex flex-col gap-4 font-poppins">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <MyComponent />
        </div>
      </section>
    </>
  );
}

export default Home;
