 <body>
  <table width="640" border="0" align="center" cellpadding="0" cellspacing="0" style="border-collapse: collapse;background-color: #fff;">
   <tbody>
    <tr>
     <td align="center" valign="top" style="background-color: #fff;">
      <!-- start products -->
      <table align="center" width="600" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-family: Helvetica, Arial, 'sans-serif'; color: #4C4C4D; line-height: 1.3em;">
       <tbody>
        <tr>
         <td height="20"></td>
        </tr>
        <tr>
         <td valign="top">
          <table width="100%" border="0" cellspacing="0" cellpadding="5">
           <tr>
            <td width="50%" valign="top">
             <table width="100%" border="0" cellspacing="0" cellpadding="5">
              <tr>
               <td style="font-family: Helvetica, Arial, 'sans-serif'; text-transform: uppercase; text-align: center;font-size: 18px; font-weight: 700; color: #00000; line-height: 20px;">Payment Information</td>
              </tr>
              <tr>
              <tr>
               <td><span style="font-weight: bold; color:#000; font-size: 14px;">Order Number:</span> ${record.tranid} </td>
              </tr>
              <tr>
               <td><span style="font-weight: bold; color:#000; font-size: 14px;">Payment Method:</span> ${record.custbody_paycode_ref} </td>
              </tr>
              <tr>
               <td><span style="font-weight: bold; color:#000; font-size: 14px;"> Sending Payment To:<br />
                </span>
                <#if record.custbody_paycode_ref=='PayPal'> ${record.custbody_gsv_order_email}
                 <#else /> ${record.billaddress}
                </#if>
               </td>
              </tr>
              <tr>
               <td><span style="font-weight: bold; color:#000; font-size: 14px;">Tag Name: </span> ${record.custbody_tagname} </td>
              </tr>
              <tr>
               <td colspan="2" style="font-size: 14px; line-height: 1.2em;"><span style="font-weight: bold; color:#000; font-size: 14px;">Order Notes:</span> ${record.custbody_purchaseordernotes} </td>
              </tr>
              <tbody>
              </tbody>
             </table>
            </td>
            <td width="50%" valign="top">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; border-radius: 5px;">
              <tr>
               <td colspan="2" style="font-family: Helvetica, Arial, 'sans-serif'; text-transform: uppercase; text-align: center;font-size: 18px; font-weight: 700; color: #00000; line-height: 20px; padding: 8px 0px;">Trade-In Summary</td>
              </tr>
              <tr>
               <td width="50%" valign="middle" style="border-top: 1px solid #999; padding: 5px 0px 5px 5px;"><span style="font-weight: bold; color:#000;"> Subtotal (${numItemsExpected} item<#if (numItemsExpected> 1)>s</#if>) </span></td>
               <td width="50%" align="right" valign="middle" style="border-top: 1px solid #999;padding: 5px 5px 5px 0px;"> ${expectedSubTotal?string.currency} </td>
              </tr>
              <#if hasPromoAmount==true>
               <tr>
                <td width="50%" valign="middle" style="font-weight: bold; color:#000;padding: 0px 0px 5px 5px;">Promo Code Subtotal</td>
                <td width="50%" align="right" valign="middle" style="padding: 0px 5px 5px 0px;">- ${promoCodeSubtotal?string.currency} </td>
               </tr>
              </#if>
              <tr>
               <td width="50%" valign="middle" style="font-weight: bold; color:#000;padding: 0px 0px 5px 5px;">Shipping Charge</td>
               <td width="50%" align="right" valign="middle" style="padding: 0px 5px 5px 0px;">- ${expectedChargesTotal?string.currency} </td>
              </tr>
              <tr>
               <td width="50%" style="border-top: 2px solid #999;padding: 5px 0px 8px 5px;"><span style="font-weight: bold; color:#00000; ">TOTAL </span></td>
               <td width="50%" align="right" style="border-top: 2px solid #999;padding: 5px 5px 8px 0px;"><span style="font-weight: bold; color:#00000; "> ${(expectedSubTotal+expectedChargesTotal)?string.currency} </span></td>
              </tr>
              <tbody>
              </tbody>
             </table>
             <strong><br />
              <br /> Thank you for using The Cleveland-Srixon Trade-In Program!</strong>
            </td>
           </tr>
           <tbody>
           </tbody>
          </table>
         </td>
        </tr>
        <tr>
         <td height="20"></td>
        </tr>
       </tbody>
      </table>
      <!-- End Products -->
     </td>
    </tr>
   </tbody>
  </table>
 </body>