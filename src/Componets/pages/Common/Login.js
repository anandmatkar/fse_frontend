


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

        <div className="section_our_solution">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="our_solution_category">
                <div className="solution_cards_box">
                  <div className="solution_card" style={{ backgroundColor: "rgb(88, 128, 227)" }}>
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      {/* SVG icon or other content for the first card */}
                    </div>
                    <div className="solu_title">
                      <h3>Admin Login</h3>
                    </div>
                    <div className="solu_description">
                      <p>• If you are the Admin then Login Here!..</p>
                      <DynamicButton
                        className="read_more_btn"
                        onClick={adminLoginTab}
                      >
                        Click Here
                      </DynamicButton>
                    </div>
                  </div>
                  <div className="solution_card" style={{ backgroundColor: "green" }}>
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      {/* SVG icon or other content for the second card */}
                    </div>
                    <div className="solu_title">
                      <h3>Technician Login</h3>
                    </div>
                    <div className="solu_description">
                      <p>
                        • If you are a Technician then Click Here! for Login
                        and Register
                      </p>
                      <DynamicButton
                        className="read_more_btn"
                        onClick={TloginAndRegister}
                      >
                        Click Here
                      </DynamicButton>
                    </div>
                  </div>
                </div>

                <div className="solution_cards_box sol_card_top_3">
                  <div className="solution_card" style={{ backgroundColor:"tomato" }}>
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      {/* SVG icon or other content for the third card */}
                    </div>
                    <div className="solu_title">
                      <h3>Manager Login</h3>
                    </div>
                    <div className="solu_description">
                      <p>
                        • If you are a manager Click Here! for Login and
                        Register
                      </p>
                      <button
                        type="button"
                        className="read_more_btn"
                        onClick={MloginAndRegister}
                      >
                        Click Here!
                      </button>
                    </div>
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

