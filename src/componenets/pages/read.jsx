import React from "react";
import Footer from "../common/footer";
import Navbar from "../common/navbar";

const Read = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: "0 20px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Read</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item ">Read</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <a href="/inbox" className="btn btn-primary btn-block mb-3">
                  Back to Inbox
                </a>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Folders</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <ul className="nav nav-pills flex-column">
                      <li className="nav-item active">
                        <a href="#" className="nav-link">
                          <i className="fas fa-inbox" /> Inbox
                          <span className="badge bg-primary float-right">
                            12
                          </span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          <i className="far fa-envelope" /> Sent
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Labels</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body p-0">
                    <ul className="nav nav-pills flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="far fa-circle text-danger" /> Important
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="far fa-circle text-warning" />{" "}
                          Promotions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="far fa-circle text-primary" /> Social
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
              <div className="col-md-9">
                <div className="card card-primary card-outline">
                  <div className="card-header">
                    <h3 className="card-title">Read Mail</h3>
                    <div className="card-tools">
                      <a
                        href="#"
                        className="btn btn-tool"
                        data-toggle="tooltip"
                        title="Previous"
                      >
                        <i className="fas fa-chevron-left" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-tool"
                        data-toggle="tooltip"
                        title="Next"
                      >
                        <i className="fas fa-chevron-right" />
                      </a>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body p-0">
                    <div className="mailbox-read-info">
                      <h5>Message Subject Is Placed Here</h5>
                      <h6>
                        From: support@muawin.com
                        <span className="mailbox-read-time float-right">
                          05 Jun. 2023 04:30 PM
                        </span>
                      </h6>
                    </div>
                    {/* /.mailbox-read-info */}
                    <div className="mailbox-controls with-border text-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-default btn-sm"
                          data-toggle="tooltip"
                          data-container="body"
                          title="Delete"
                        >
                          <i className="far fa-trash-alt" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-sm"
                          data-toggle="tooltip"
                          data-container="body"
                          title="Reply"
                        >
                          <i className="fas fa-reply" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-sm"
                          data-toggle="tooltip"
                          data-container="body"
                          title="Forward"
                        >
                          <i className="fas fa-share" />
                        </button>
                      </div>
                      {/* /.btn-group */}
                      <button
                        type="button"
                        className="btn btn-default btn-sm"
                        data-toggle="tooltip"
                        title="Print"
                      >
                        <i className="fas fa-print" />
                      </button>
                    </div>
                    {/* /.mailbox-controls */}
                    <div className="mailbox-read-message">
                      <p>Hello John,</p>
                      <p>
                        Keffiyeh blog actually fashion axe vegan, irony
                        biodiesel. Cold-pressed hoodie chillwave put a bird on
                        it aesthetic, bitters brunch meggings vegan iPhone.
                        Dreamcatcher vegan scenester mlkshk. Ethical master
                        cleanse Bushwick, occupy Thundercats banjo cliche ennui
                        farm-to-table mlkshk fanny pack gluten-free. Marfa
                        butcher vegan quinoa, bicycle rights disrupt tofu
                        scenester chillwave 3 wolf moon asymmetrical taxidermy
                        pour-over. Quinoa tote bag fashion axe, Godard disrupt
                        migas church-key tofu blog locavore. Thundercats cronut
                        polaroid Neutra tousled, meh food truck selfies narwhal
                        American Apparel.
                      </p>
                      <p>
                        Raw denim McSweeney's bicycle rights, iPhone trust fund
                        quinoa Neutra VHS kale chips vegan PBR&amp;B literally
                        Thundercats +1. Forage tilde four dollar toast, banjo
                        health goth paleo butcher. Four dollar toast Brooklyn
                        pour-over American Apparel sustainable, lumbersexual
                        listicle gluten-free health goth umami hoodie. Synth
                        Echo Park bicycle rights DIY farm-to-table, retro kogi
                        sriracha dreamcatcher PBR&amp;B flannel hashtag irony
                        Wes Anderson. Lumbersexual Williamsburg Helvetica next
                        level. Cold-pressed slow-carb pop-up normcore
                        Thundercats Portland, cardigan literally meditation
                        lumbersexual crucifix. Wayfarers raw denim paleo
                        Bushwick, keytar Helvetica scenester keffiyeh 8-bit
                        irony mumblecore whatever viral Truffaut.
                      </p>
                      <p>
                        Post-ironic shabby chic VHS, Marfa keytar flannel lomo
                        try-hard keffiyeh cray. Actually fap fanny pack yr
                        artisan trust fund. High Life dreamcatcher church-key
                        gentrify. Tumblr stumptown four dollar toast vinyl,
                        cold-pressed try-hard blog authentic keffiyeh Helvetica
                        lo-fi tilde Intelligentsia. Lomo locavore salvia
                        bespoke, twee fixie paleo cliche brunch Schlitz blog
                        McSweeney's messenger bag swag slow-carb. Odd Future
                        photo booth pork belly, you probably haven't heard of
                        them actually tofu ennui keffiyeh lo-fi Truffaut health
                        goth. Narwhal sustainable retro disrupt.
                      </p>
                      <p>
                        Skateboard artisan letterpress before they sold out High
                        Life messenger bag. Bitters chambray leggings listicle,
                        drinking vinegar chillwave synth. Fanny pack hoodie
                        American Apparel twee. American Apparel PBR listicle,
                        salvia aesthetic occupy sustainable Neutra kogi. Organic
                        synth Tumblr viral plaid, shabby chic single-origin
                        coffee Etsy 3 wolf moon slow-carb Schlitz roof party
                        tousled squid vinyl. Readymade next level literally
                        trust fund. Distillery master cleanse migas, Vice
                        sriracha flannel chambray chia cronut.
                      </p>
                      <p>
                        Thanks,
                        <br />
                        Jane
                      </p>
                    </div>
                    {/* /.mailbox-read-message */}
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer bg-white">
                    <ul className="mailbox-attachments d-flex align-items-stretch clearfix">
                      <li>
                        <span className="mailbox-attachment-icon">
                          <i className="far fa-file-pdf" />
                        </span>
                        <div className="mailbox-attachment-info">
                          <a href="#" className="mailbox-attachment-name">
                            <i className="fas fa-paperclip" />{" "}
                            Sep2014-report.pdf
                          </a>
                          <span className="mailbox-attachment-size clearfix mt-1">
                            <span>1,245 KB</span>
                            <a
                              href="#"
                              className="btn btn-default btn-sm float-right"
                            >
                              <i className="fas fa-cloud-download-alt" />
                            </a>
                          </span>
                        </div>
                      </li>
                      <li>
                        <span className="mailbox-attachment-icon">
                          <i className="far fa-file-word" />
                        </span>
                        <div className="mailbox-attachment-info">
                          <a href="#" className="mailbox-attachment-name">
                            <i className="fas fa-paperclip" /> App
                            Description.docx
                          </a>
                          <span className="mailbox-attachment-size clearfix mt-1">
                            <span>1,245 KB</span>
                            <a
                              href="#"
                              className="btn btn-default btn-sm float-right"
                            >
                              <i className="fas fa-cloud-download-alt" />
                            </a>
                          </span>
                        </div>
                      </li>
                      <li>
                        <span className="mailbox-attachment-icon has-img">
                          <img
                            src="../../dist/img/photo1.png"
                            alt="Attachment"
                          />
                        </span>
                        <div className="mailbox-attachment-info">
                          <a href="#" className="mailbox-attachment-name">
                            <i className="fas fa-camera" /> photo1.png
                          </a>
                          <span className="mailbox-attachment-size clearfix mt-1">
                            <span>2.67 MB</span>
                            <a
                              href="#"
                              className="btn btn-default btn-sm float-right"
                            >
                              <i className="fas fa-cloud-download-alt" />
                            </a>
                          </span>
                        </div>
                      </li>
                      <li>
                        <span className="mailbox-attachment-icon has-img">
                          <img
                            src="../../dist/img/photo2.png"
                            alt="Attachment"
                          />
                        </span>
                        <div className="mailbox-attachment-info">
                          <a href="#" className="mailbox-attachment-name">
                            <i className="fas fa-camera" /> photo2.png
                          </a>
                          <span className="mailbox-attachment-size clearfix mt-1">
                            <span>1.9 MB</span>
                            <a
                              href="#"
                              className="btn btn-default btn-sm float-right"
                            >
                              <i className="fas fa-cloud-download-alt" />
                            </a>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-footer */}
                  <div className="card-footer">
                    <div className="float-right">
                      <button type="button" className="btn btn-default">
                        <i className="fas fa-reply" /> Reply
                      </button>
                      <button type="button" className="btn btn-default">
                        <i className="fas fa-share" /> Forward
                      </button>
                    </div>
                    <button type="button" className="btn btn-default">
                      <i className="far fa-trash-alt" /> Delete
                    </button>
                    <button type="button" className="btn btn-default">
                      <i className="fas fa-print" /> Print
                    </button>
                  </div>
                  {/* /.card-footer */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
        </section>
        {/* /.content */}
      </div>
      <Footer />
    </div>
  );
};

export default Read;
