const Buy = require('../models/Buys')
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

const buyController = {
    getBuyByID: async(req , res)=>{
        try {
            const userBuys = await Buy.find({userId: req.params.id})
            if (userBuys.length != 0) {
                res.json({success: true, respuesta: userBuys})
            } else{
            res.json({success: false, respuesta: []})
        }
        } catch(error) {
            console.log(error)
            res.json({success: false, respuesta: 'Oops! an error has ocurred with the server. Verify the endpoint or the ID and if it still not working, please try again later...'})
        }  
    },
    addBuy: async(req , res) =>{
        let {firstName, lastName, city, cellphone, direction, total, products, userId, email} = req.body
        let personalInfo = {firstName, lastName, city, cellphone, direction, email}
        try{
            const new_buy = new Buy({products, userId, deliverInformation: personalInfo, totalPrice:total })
            await new_buy.save()
            let mailOptions = {
                from: 'Your Buy has been processed! <nocontestar@donotreply.com>',
                to: email,
                subject: 'Thanks for your Buy!',
                html: `<body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
                <!--[if IE]><div class="ie-container"><![endif]-->
                <!--[if mso]><div class="mso-container"><![endif]-->
                <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
                <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
                  
              
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #fc5656;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-image: url('https://i.imgur.com/5HLLX52.jpg');background-repeat: repeat;background-position: center top;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-image: url('images/image-1.jpeg');background-repeat: repeat;background-position: center top;background-color: #fc5656;"><![endif]-->
                    
              <!--[if (mso)|(IE)]><td align="center" width="534" style="width: 534px;padding: 0px;border-top: 8px solid #000000;border-left: 8px solid #000000;border-right: 8px solid #000000;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 8px solid #000000;border-left: 8px solid #000000;border-right: 8px solid #000000;border-bottom: 0px solid transparent;"><!--<![endif]-->
                
              <table class="hide-mobile" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="overflow-wrap:break-word;word-break:break-word;padding:34px;font-family:'Montserrat',sans-serif;" align="left">
                      
                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="1%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #fc5656;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
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
              
              <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
                      
                <div class="v-text-align" style="color: #ffffff; line-height: 100%; text-align: left; word-wrap: break-word;">
                  <p style="font-size: 14px; line-height: 100%; text-align: center;"><strong><span style="font-size: 44px; line-height: 44px;"><span style="line-height: 44px; font-size: 44px;">STAY CONNECTED</span></span></strong></p>
              <p style="font-size: 14px; line-height: 100%; text-align: center;"><span style="font-size: 72px; line-height: 72px;"><strong><span style="line-height: 72px; font-size: 72px;"><span style="line-height: 72px; font-size: 72px;">GAME-X</span></span></strong></span></p>
                </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Montserrat',sans-serif;" align="left">
                      
                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="1%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #fc5656;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
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
              
              <table class="hide-mobile" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="overflow-wrap:break-word;word-break:break-word;padding:82px;font-family:'Montserrat',sans-serif;" align="left">
                      
                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="1%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #fc5656;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
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
              
              <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">
                      
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                    
                    <img align="center" border="0" src="https://media3.giphy.com/media/THhkuC6hmE6nfmAMpD/giphy.gif?cid=790b761174af28b8c0417a44281570b43fac212ab08f425d&rid=giphy.gif&ct=s" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 12%;max-width: 63.6px;" width="63.6"/>
                    
                  </td>
                </tr>
              </table>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
                      
                <div class="v-text-align" style="color: #ffffff; line-height: 200%; text-align: center; word-wrap: break-word;">
                  <p style="font-size: 14px; line-height: 200%;"><span style="font-size: 14px; line-height: 28px;"><span style="font-size: 18px; line-height: 36px;"><strong>Thanks for your buy! It'll be arriving in 48hs max.</strong></span></span></p>
              <p style="font-size: 14px; line-height: 200%;">&nbsp;</p>
              <p style="font-size: 14px; line-height: 200%;"><span style="font-size: 18px; line-height: 36px;"><strong>Fill your energy bar with our winter sales</strong></span></p>
                </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Montserrat',sans-serif;" align="left">
                      
                <div class="v-text-align" style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                  <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 48px; line-height: 67.2px;"><strong><span style="line-height: 67.2px; font-size: 48px;">8 0 % O F F</span></strong></span></p>
                </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
                      
              <div class="v-text-align" align="center">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://game-x-arg.herokuapp.com/games" style="height:36px; v-text-anchor:middle; width:264px;" arcsize="11%" stroke="f" fillcolor="#061320"><w:anchorlock/><center style="color:#a3eee9;font-family:'Montserrat',sans-serif;"><![endif]-->
                  <a href="https://game-x-arg.herokuapp.com/games" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #a3eee9; background-color: #061320; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                    <span style="display:block;padding:10px 70px;line-height:120%;"><strong><span style="font-size: 14px; line-height: 16.8px;">GRAB THE DEAL!</span></strong></span>
                  </a>
                <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
              </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table id="u_content_text_2" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 17px 20px;font-family:'Montserrat',sans-serif;" align="left">
                      
                <div class="v-text-align" style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                  <p style="font-size: 14px; line-height: 140%; text-align: right;"><span style="font-size: 10px; line-height: 14px;">*Valid Till: 15/6/2021</span></p>
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
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #000000;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #000000;"><![endif]-->
                    
              <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                
              <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="overflow-wrap:break-word;word-break:break-word;padding:40px;font-family:'Montserrat',sans-serif;" align="left">
                      
                <div class="v-text-align" style="color: #828388; line-height: 140%; text-align: left; word-wrap: break-word;">
                  <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 14px; line-height: 19.6px;">&copy; Game-X. &nbsp;All Rights Reserved </span></p>
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
            res.json({success: true , response: new_buy})
        }catch(error){
            console.log("error en addBuy" , error)
            res.json({success: false , response: error})
        }
    },
    getAllbuys: async(req , res)=>{
        try{
            const allBuys = await Buy.find()
            res.json({success: true , response: allBuys})
        }catch(error){
            console.log("error en getAllBuys" , error)
            res.json({success: false , response: error})
        }
    },
    modifyBuyByID: async(req , res)=>{
        try{
            const buy = await Buy.findOneAndUpdate({_id: req.params.id} , {...req.body} , {new:true})
            res.json({success: true , response: buy})
        }catch(error){
            console.log("error en modifyBuy" , error)
            res.json({success: false , response: error})
        }
    },
    deleteBuyByID: async(req , res)=>{
        try{
            const buy = await Buy.findOneAndRemove({_id: req.params.id})
            res.json({success: true})
        }catch(error){
            console.log("error en deleteBuyByID" , error)
            res.json({success: false , response: error})
        }
    }
}

module.exports = buyController