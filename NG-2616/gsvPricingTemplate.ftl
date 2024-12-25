<!DOCTYPE html>
<html>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
        <title>There has been a price update to items you are tracking</title>
    </head>

    <body
        style="font-family: Helvetica, Arial, 'sans-serif';margin:0;padding:0;width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-font-smoothing:antialiased; font-size: 15px; color: #4C4C4D;"> ​ <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
            style="border-collapse: collapse;margin: 0;padding: 0;table-layout: fixed;background-color: #f0f0f0;width: 100% !important;">
            <tbody>
                <tr>
                    <td align="center" valign="top"> ​
                        <!-- header -->
                        <!-- end header -->
                        <table width="640" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="border-collapse: collapse;background-color: #fff;">
                            <tbody>
                                <tr>
                                    <td align="center"><a href="https://golfstixvalueguide.com"
                                            title="Golf Stix Value Guide"><img
                                                src="http://www.2ndswing.com/images/email/logo-gsvsystememail.jpg"
                                                width="339" height="142" style="border: 0; padding: 20px;" /></a></td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" style="background-color: #fff;">
                                        <!-- start products -->
                                        <table align="center" width="600" border="0" cellpadding="0" cellspacing="0"
                                            style="border-collapse: collapse; font-family: Helvetica, Arial, 'sans-serif'; color: #4C4C4D; line-height: 1.3em;">
                                            <tbody>
                                                <tr>
                                                    <td height="20"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="5">
                                                            <tr>
                                                                <td colspan="2"
                                                                    style="color: #000; font-size: 18px; line-height: 22px;"> Hi ${itemInfo.vendorName}, <br><br> Thanks for using Golf Stix Value Guide to check values on your inventory. <br><br> One of the items you are currently tracking has recently changed in value. </td>
                                                            </tr>
                                                            <tbody>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td height="20"></td>
                                                </tr>
                                                <tr>
                                                    <td align="center" valign="top" style="background-color: #fff;">
                                                        <!-- start products -->
                                                        <table align="center" width="600" border="0" cellpadding="0" cellspacing="0"
                                                            style="border-collapse: collapse; font-family: 'Roboto', Helvetica, Arial, 'sans-serif'; color: #4C4C4D; line-height: 1.3em;">
                                                            <tbody align="center">
                                                                <tr>
                                                                    <td height="20"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td valign="top">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="5">
                                                                        </table>
                                                                    </td>
                                                                </tr> ​ <tr align="center">
                                                                    <td align="center" valign="top">
                                                                        <table align="center" width="100%" border="0" cellspacing="0" cellpadding="5">
                                                                            <tr align="center">
                                                                                <td align="center" style="border-top: 1px solid #e3dede;">
                                                                                    <table align="center" width="585px" border="0" cellspacing="0"
                                                                                        cellpadding="5">
                                                                                        <tr align="center">
                                                                                            <td width="100" valign="middle"> ​ <#if itemInfo.imageUrl?has_content>
                                                                                                    <img src="${itemInfo.imageUrl}"
                                                                                                        style="width:75px; height: auto; max-height:90px;">
                                                                                                </#if>
                                                                                            </td>
                                                                                            <td>
                                                                                                <table width="100%" border="0"
                                                                                                    cellspacing="0" cellpadding="5">
                                                                                                    <tr>
                                                                                                        <td colspan="2"
                                                                                                            style="border-bottom: 1px solid #999;">
                                                                                                            <span
                                                                                                                style="font-weight: bold; color:#000;"> ${itemInfo.itemName} </span>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr
                                                                                                        style="background-color: #f4f4f4;">
                                                                                                        <td width="60%"><span
                                                                                                                style="font-weight: bold; color:#000; font-size: 14px; display: inline-block;">Old Value:</span> ${itemInfo.previousPrice} <br /></td>
                                                                                                        <td width="40%" align="right" rowspan="2"><span
                                                                                                                style="font-weight: bold; color:#000; font-size: 14px; display: inline; float: right;"></span>
                                                                                                            <span
                                                                                                                style="margin-top: 5px;display: inline-block; float: right;"><a
                                                                                                                    href=${itemInfo.sellItemUrl}
                                                                                                                    style="padding: 5px; padding-left: 10px; padding-right: 10px; margin-right: 5px; float: right; background-color:#c50000;border:1px solid #840000;border-radius:2px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:18px;font-weight:bold;line-height:30px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;">Sell this item</a></span>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr
                                                                                                        style="background-color: #f4f4f4;">
                                                                                                        <td width="60%"><span
                                                                                                                style="font-weight: bold; color:#000; font-size: 14px; display: inline-block;"> New Value: </span> ${itemInfo.currentPrice} </td>
                                                                                                    </tr>
                                                            </tbody>
                                                        </table>
                                                        <!-- End Products -->
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td height="20"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table align="center" width="600" border="0" cellpadding="0" cellspacing="0"
                                            style="border-collapse: collapse; font-family: Helvetica, Arial, 'sans-serif'; color: #4C4C4D; line-height: 1.3em;">
                                            <tbody>
                                                <tr>
                                                    <td height="20"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="5">
                                                            <tr>
                                                                <td colspan="2" style="color: #000; font-size: 18px; line-height: 22px; margin-bottom: 10px;"> Please use this button to access your account on Golf Stix Value Guide </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr align="center">
                                                    <td height="20">
                                                        <span
                                                            style="margin-top: 5px; margin-bottom: 10px; display:inline-block; margin-left:auto; margin-right: auto; width:50%;"><a
                                                                href="https://www.dev.golfstixvalueguide.info/my-account/"
                                                                style="padding: 5px; padding-left: 10px; padding-right: 10px; background-color:#c50000;border:1px solid #840000;border-radius:2px;color:#ffffff; display:block; margin-left:auto; margin-right: auto; width:50%;font-family:sans-serif;font-size:18px;font-weight:bold;line-height:30px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;">My Account</a></span>
                                                    </td>
                                                </tr> ​
                                            </tbody>
                                        </table>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            style="border-collapse: collapse;background-color: #fff; border-collapse: collapse;background-color: #fff; border-top: 1px solid #cccccc;"
                                            width="640">
                                            <tbody>
                                                <tr>
                                                    <td align="center" valign="top">
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                            style="border-collapse: collapse;" width="600">
                                                            <tbody>
                                                                <tr>
                                                                    <td height="35" align="center">
                                                                        <p
                                                                            style="font-weight: normal; font-family:Arial, Helvetica, sans-serif, sans-serif; color: #ababab; font-size: 12px; line-height: 18px;"> You are receiving this email because you subscribed with golfstixvalueguide.com.<br /> We promise to use your information only according to our privacy policy. </p>
                                                                        <p
                                                                            style="font-weight: normal; font-family:Arial, Helvetica, sans-serif, sans-serif; color: #ababab; font-size: 12px; line-height: 18px;">
                                                                            <a href="#" style="text-decoration: none;
    color: #840000; border-bottom: 1px solid #840000; border-bottom-color: #840000;">Update Your Preferences</a> | <a
                                                                                href="#" style="text-decoration: none;
    color: #840000; border-bottom: 1px solid #840000; border-bottom-color: #840000;">Unsubscribe</a> | <a href="#"
                                                                                style="text-decoration: none;
    color: #840000; border-bottom: 1px solid #840000; border-bottom-color: #840000;">Privacy Policy</a>
                                                                        </p>
                                                                        <p
                                                                            style="font-weight: normal; font-family:Arial, Helvetica, sans-serif, sans-serif; color: #ababab; font-size: 12px; line-height: 18px;">
                                                                            <span
                                                                                style="font-weight: normal; font-family:Arial, Helvetica, sans-serif, Helvetica, sans-serif; color: #ababab; font-size: 11px; line-height: 18px;">Copyright © 2021 Golfstix Value Guide, All rights reserved.</span>
                                                                        </p>
                                                                        <p
                                                                            style="font-weight: normal; font-family:Arial, Helvetica, sans-serif, sans-serif; color: #ababab; font-size: 12px; line-height: 18px;"> &nbsp;</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <!-- end footer -->
                                        <!-- end container table -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
    </body>

</html>