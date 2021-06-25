const User = require('../models/User')
const Chat = require('../models/Chat')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('nodemailer')



let transport = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

const userController = {
    newUser: async (req, res) => {  
        var {userName, email, password, avatarURL, country, imageUrl} = req.body
        const {avatar} = req.files ? req.files : req.body
        const existentMail = await User.findOne({email})
        const existentUserName = await User.findOne({userName})
        var respuesta;
        var error;    
        var createdUser;
        password = bcryptjs.hashSync(password, 10)
        if (!existentMail && !existentUserName) {
            try {
                createdUser = new User({userName, email, password, avatar: avatarURL ? avatarURL : '', country, imageUrl: imageUrl ? imageUrl: null, loggedWithGoogle: country === "null", friends:[] })
                const {_id} = createdUser
                const fileName = _id + ".jpg"
                // const path = `${__dirname, './'}/frontend/public/assets/${fileName}`
                const path = `${__dirname, './'}/client/build/assets/${fileName}`
                createdUser.avatar = '/assets/' + fileName 
                await createdUser.save()
                avatar.name && avatar.mv(path, error =>{                
                    if (error) {
                        return res.json({success: false, respuesta: "failed trying to save avatar"})
                    }
                })
                let mailOptions = {
                    from: 'Account Created! <nocontestar@donotreply.com>',
                    to: email,
                    subject: 'Thanks for your Registration!',
                    html: `<body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #0f3242;color: #000000">
                    <!--[if IE]><div class="ie-container"><![endif]-->
                    <!--[if mso]><div class="mso-container"><![endif]-->
                    <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #0f3242;width:100%" cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr style="vertical-align: top">
                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #0f3242;"><![endif]-->
                      
                  
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #113c55;">
                      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #113c55;"><![endif]-->
                        
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                    
                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 0px 15px;font-family:'Lato',sans-serif;" align="left">
                          
                    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 4px solid #af1127;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                      <tbody>
                        <tr style="vertical-align: top">
                          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                            <span>&#160;</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
                  
                  
                  
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #113c55;">
                      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #113c55;"><![endif]-->
                        
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                    
                  <table id="u_content_image_1" style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 15px;font-family:'Lato',sans-serif;" align="left">
                          
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                        
                        <img align="center" border="0" src="https://media3.giphy.com/media/THhkuC6hmE6nfmAMpD/giphy.gif?cid=790b761174af28b8c0417a44281570b43fac212ab08f425d&rid=giphy.gif&ct=s" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 20%;max-width: 116px;" width="116" class="v-src-width v-src-max-width"/>
                        
                      </td>
                    </tr>
                  </table>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">
                          
                    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
                      <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="color: #ffffff; font-size: 14px; line-height: 19.6px;"><strong><span style="font-family: Raleway, sans-serif; font-size: 26px; line-height: 36.4px;">THANKS FOR YOUR REGISTER!</span></strong></span></p>
                    </div>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
                  
                  
                  
                  <div class="u-row-container" style="padding: 0px;background-image: url(' ');background-repeat: no-repeat;background-position: center top;background-color: transparent">
                    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-image: url(' ');background-repeat: no-repeat;background-position: center top;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                        
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                    
                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;" align="left">
                          
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                        
                        <img align="center" border="0" src="https://i.imgur.com/3aNrRJF.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;" width="600" class="v-src-width v-src-max-width"/>
                        
                      </td>
                    </tr>
                  </table>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
                  
                  
                  
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #113c55;">
                      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #113c55;"><![endif]-->
                        
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                    
                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 15px;font-family:'Lato',sans-serif;" align="left">
                          
                    <div style="color: #ffffff; line-height: 150%; text-align: center; word-wrap: break-word;">
                      <p style="font-size: 14px; line-height: 150%;"><strong><span style="font-family: Raleway, sans-serif; font-size: 14px; line-height: 21px;"><span style="font-size: 26px; line-height: 39px;">YOUR TRIP BEGINS HERE...</span></span></strong></p>
                  <p style="font-size: 14px; line-height: 150%;"><strong><span style="font-family: Raleway, sans-serif; font-size: 14px; line-height: 21px;"><span style="font-size: 26px; line-height: 39px;">BECOME A HERO!</span></span></strong></p>
                    </div>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 40px 40px;font-family:'Lato',sans-serif;" align="left">
                          
                    <div style="color: #ffffff; line-height: 150%; text-align: center; word-wrap: break-word;">
                      <p style="font-size: 14px; line-height: 150%;">take advantage of winter sales and add games to your collection!</p>
                  <p style="font-size: 14px; line-height: 150%;">up to 80% discount!</p>
                    </div>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <table id="u_content_button_1" style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">
                          
                  <div align="center">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Lato',sans-serif;"><tr><td style="font-family:'Lato',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://game-x-arg.herokuapp.com/games" style="height:42px; v-text-anchor:middle; width:192px;" arcsize="24%" stroke="f" fillcolor="#000000"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Lato',sans-serif;"><![endif]-->
                      <a href="https://game-x-arg.herokuapp.com/games" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Lato',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #000000; border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                        <span class="v-padding" style="display:block;padding:13px 40px;line-height:120%;"><strong><span style="font-size: 14px; line-height: 16.8px; font-family: Lato, sans-serif;">GRAB THE DEAL!</span></strong></span>
                      </a>
                    <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                  </div>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
                  
                  
                  
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #113c55;">
                      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #113c55;"><![endif]-->
                        
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                    
                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;" align="left">
                          
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                        
                        <img align="center" border="0" src="https://i.imgur.com/yMboG8J.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;" width="600" class="v-src-width v-src-max-width"/>
                        
                      </td>
                    </tr>
                  </table>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
                  
                  
                  
                  <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #153257;">
                      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #153257;"><![endif]-->
                        
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                    
                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">
                          
                  <div align="center">
                    <div style="display: table; max-width:187px;">
                    <!--[if (mso)|(IE)]><table width="187" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:187px;"><tr><![endif]-->
                    
                      
                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                          <a href="https://facebook.com/" title="Facebook" target="_blank">
                            <img src="https://i.imgur.com/aJPA5Py.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                          </a>
                        </td></tr>
                      </tbody></table>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      
                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                          <a href="https://twitter.com/" title="Twitter" target="_blank">
                            <img src="https://i.imgur.com/QVq13f9.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                          </a>
                        </td></tr>
                      </tbody></table>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      
                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                          <a href="https://linkedin.com/" title="LinkedIn" target="_blank">
                            <img src="https://i.imgur.com/9eTxoAD.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                          </a>
                        </td></tr>
                      </tbody></table>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      
                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                          <a href="https://instagram.com/" title="Instagram" target="_blank">
                            <img src="https://i.imgur.com/6MEhUMi.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                          </a>
                        </td></tr>
                      </tbody></table>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      
                      
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 30px;font-family:'Lato',sans-serif;" align="left">
                          
                    <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                      <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Lato, sans-serif; font-size: 14px; line-height: 19.6px;">Game-X&nbsp; it's a product developed by "Los debuggeadores de la nada 2.0"</span></p>
                  <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Lato, sans-serif; font-size: 14px; line-height: 19.6px;">MindHub Cohort 3</span></p>
                    </div>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 20px 15px;font-family:'Lato',sans-serif;" align="left">
                          
                    <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 12px; line-height: 16.8px;">500 Terry Francois Street, San Francisco, CA 94158, Game-X Build 5th floor,&nbsp; Tel: 123-456-7890. </span></p>
                  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 12px; line-height: 16.8px;">&copy;&nbsp; All rights reserved. </span></p>
                    </div>
                  
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
                  
                  
                      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if mso]></div><![endif]-->
                    <!--[if IE]></div><![endif]-->
                  </body>`
                    }
                transport.sendMail(mailOptions, (err) => {
                    if (err) { 
                        console.log(err)
                        res.json({success: true})
                    }
                    })           
                const token = jwt.sign({...createdUser}, process.env.SECRET_OR_KEY)
                respuesta = token   
            } catch (error) {
                console.log(error)
                error = "There was an error in the register."
            }                  
       } else if (existentMail){
           error = "The E-mail is already in use"
       } else {
           error = "The Username is already in use"
       }
       res.json({
           success: !error ? true : false,
           respuesta: !error ? {token: respuesta, avatar: createdUser.avatar , imageUrl: createdUser.imageUrl , userName: createdUser.userName, id:createdUser._id, rol:createdUser.rol, friends:createdUser.friends,favouritesList:createdUser.favouritesList, email:createdUser.email}: null,
           error: error
       })  
    },
    logIn: async (req, res) => {
        const {userName, password, country} = req.body
        var respuesta;
        var error;
        let filteredFriendData
        const userExist = await User.findOne({userName: userName}).populate('friends')
        if (userExist) {
            if (!userExist.loggedWithGoogle && !country || userExist.loggedWithGoogle && country === "null") {
                const passwordMatch = bcryptjs.compareSync(password, userExist.password)
                if (passwordMatch) {
                    const token = jwt.sign({...userExist}, process.env.SECRET_OR_KEY)
                    respuesta = token
                    const populatedFriends = userExist.friends
                    filteredFriendData = populatedFriends.map(friend =>{
                        return {avatar:friend.avatar, userName:friend.userName,id:friend._id,email:friend.email}
                    })
                } else {
                    error = "Invalid User or Password"
                } 
            } else if (!userExist.loggedWithGoogle && country === "null"){
                error = "Users Registered without Google cannot log in with Google. Complete the fields to log in."            
            }else {
                error = "Users Registered with Google can only log in with Google button"
            }                       
        } else {
            error = "Invalid Username or Password"
        }
        res.json({
            success: !error ? true : false,
            respuesta:!error ? {token: respuesta, avatar: userExist.avatar, imageUrl:userExist.imageUrl, userName: userExist.userName, id:userExist._id, rol:userExist.rol, friends:filteredFriendData, favouritesList:userExist.favouritesList,email:userExist.email} : null,
            error: error
        })
    },
    forcedLogin: async(req, res) => {
        const {_id} = req.user
        const user = await User.findOne({_id}).populate('friends')
        const populatedFriends = user.friends
        const filteredFriendData = populatedFriends.map(friend =>{
            return {avatar:friend.avatar, userName:friend.userName,id:friend._id,email:friend.email}
        })
        res.json({success: true, respuesta: {avatar: user.avatar, imageUrl:user.imageUrl, userName: user.userName , id:user._id, rol:user.rol, friends:filteredFriendData, favouritesList:user.favouritesList, email:user.email}})
    },
    getUsers: async(req, res)=>{
        try{
            let users
            const {userName} = req.body
            userName.trim().length > 0 ?
            users = await User.find({userName:{$regex: userName.trim(), $options:'i'}})
            : users = ["There are no results for this search"]
            res.json({success:true, response:users})
        }catch(e){
            res.json({success:false})
        }
    },
    changeRol: async (req, res) => {
        const {userName, newRol} = req.body  
        if (req.user.rol === 'admin') {
            const userToModify = await User.findOneAndUpdate({userName: userName}, {rol:newRol}, {new:true}) 
            if (userToModify) {
                res.json({success:true, respuesta: userToModify})              
            } else{
                res.json({success:false, error: 'User not founded'}) 
            }
        } else {
            res.json({success:false, error: "You must be authorized Administrator to modify this property"}) 
        }
    },
    addFriend: async(req,res)=>{
        try{
            const {friendId} = req.params
            const user = req.user
            const newChat = new Chat({issuer:user._id,receiver:friendId,messages:[]})
            const options = {new:true}
            const queryChatIssuer = {$push:{friends:friendId,chats:newChat._id}}
            const queryChatReceiver = {$push:{friends:user._id, chats:newChat._id}}
            const issuer = await User.findOneAndUpdate({_id:user._id},queryChatIssuer,options).populate('friends')
            const receiver = await User.findOneAndUpdate({_id:friendId},queryChatReceiver, options)
            newChat.save()
            const populatedFriends = issuer.friends
            const filteredFriendData = populatedFriends.map(friend =>{
                return {avatar:friend.avatar, userName:friend.userName,id:friend._id,email:friend.email}
            })
            res.json({success:true,response:filteredFriendData})
            // res.json({success:true, response:newChat})

        }catch(e){
            res.json({success:false, response:e})
        }
    },
    deleteFriend: async(req,res)=>{
        try{
            const friendId = req.params.userId
            const user = req.user
            const query = {$and: [
                { $or: [ { issuer:user._id }, { issuer:friendId } ] },
                { $or: [ { receiver: friendId }, { receiver:user._id } ] }
            ]}
            await Chat.findOneAndDelete(query)
            const options = {new:true}
            const queryChatIssuer = {$pull:{friends:friendId}}
            const queryChatReceiver = {$pull:{friends:user._id}}
            const issuer = await User.findOneAndUpdate({_id:user._id},queryChatIssuer,options)
            const receiver = await User.findOneAndUpdate({_id:friendId},queryChatReceiver, options)
            const userFriends = await User.findOne({_id:user._id}).populate('friends')
            const filteredFriendData = userFriends.friends.map(friend =>{
                return {avatar:friend.avatar, userName:friend.userName,id:friend._id,email:friend.email}
            })

            res.json({success:true, response:filteredFriendData})

        }catch(e){
            console.log(e)
            res.json({success:false, response:e})
        }
    },
    addToList: async (req, res) => {
        var {sendedData} = req.body
        var {product, add, game} = sendedData
        let addedToList;
        try {
            if (game === true) {
                addedToList = await User.findOneAndUpdate({_id: req.params.id}, add  ? {$push:{favouritesList:{gameId: product}}} : {$pull:{favouritesList: {gameId: product}}}, {new: true})
            } else{
                addedToList = await User.findOneAndUpdate({_id: req.params.id}, add  ? {$push:{favouritesList:{productId: product}}} : {$pull:{favouritesList: {productId: product}}}, {new: true})
            }
            res.json({success: true, response: addedToList})
        } catch(error) {
            console.log(error)
            res.json({success: false, response: 'Oops! the ID you enter was not founded'})
        }
    },
    getAllAddedProducts: async (req, res) => {
        try {
            const gamesListed = await User.find({_id: req.params.id}).populate({ path:"favouritesList", populate:{path:"gameId"}}).populate({ path:"favouritesList", populate:{path:"productId"}})
            res.json({success: true, response: gamesListed[0].favouritesList})
        } catch(error) {
            console.log(error)
            res.json({success: false, response: 'Oops! the ID you enter was not founded'})
        }
    },
}

module.exports = userController