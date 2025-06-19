const PayuPaymentPage = ({ transactionId, formData, hash }) => {
    return (
        <div>
            <form action="https://test.payu.in/_payment" method="post">
                <input type="hidden" name="key" value="OBP1BX" />
                <input type="hidden" name="txnid" value={transactionId} />
                <input type="hidden" name="productinfo" value={"LLC formation"} />
                <input type="hidden" name="amount" value={formData?.finalPrice} />
                <input type="hidden" name="email" value={formData?.email} />
                <input type="hidden" name="firstname" value={formData?.name} />
                <input type="hidden" name="lastname" value="" />
                <input type="hidden" name="surl" value="http://localhost:8000/api/payu/success" />
                <input type="hidden" name="furl" value="http://localhost:8000/api/payu/failure" />
                <input type="hidden" name="phone" value={formData?.phone} />
                <input type="hidden" name="hash" value={hash} />
                <input type="submit" value="Submit" />
            </form>
        </div >
    )
}

export default PayuPaymentPage;