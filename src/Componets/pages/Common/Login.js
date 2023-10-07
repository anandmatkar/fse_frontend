


import React from "react";
import Layout from "../../Layout/Layout";
import { useNavigate } from "react-router-dom";
import DynamicButton from "../../Model/DynamicButton";

function LoginFrontPage() {
  const navigate = useNavigate();
  const adminLoginTab = () => {
    navigate("/adminLogin");
  };
  const MloginAndRegister = () => {
    navigate("/register");
  };
  const TloginAndRegister = () => {
    navigate("/techLogin");
  };
  return (
    <Layout>
      <div className="imgBg">
        <br />
        <br />
        <br />

    <div class="container-xxl py-5">
        <div class="container">
            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 class="section-title bg-white text-center text-primary px-3">Login</h6>
                <h1 class="mb-5">Our Login's</h1>
            </div>
            <div class="row g-4">
                <div class="col-lg-4 col-sm-12 wow fadeInUp" data-wow-delay="0.1s" onClick={adminLoginTab}>
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-globe text-primary mb-4"></i>
                            <h5>Admin Login</h5>
                            <p>If you are Admin then Login Here!..</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-12 wow fadeInUp" data-wow-delay="0.3s" onClick={TloginAndRegister}>
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-hotel text-primary mb-4"></i>
                            <h5>Technician Login</h5>
                            <p>If you are Technician then Login Here!..</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-12 wow fadeInUp" data-wow-delay="0.5s" onClick={MloginAndRegister}>
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-user text-primary mb-4"></i>
                            <h5>Manager Login</h5>
                            <p>If you are Manager then Login Here!..</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

      </div>
    </Layout>
  );
}

export default LoginFrontPage;

