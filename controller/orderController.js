const Order=require("./../model/order.model")


exports.placeOrder= async (req, res, next) => {
 
    try{

        const { user,  total_price, total_quantity,items,  payment_id}=req.body

        if (!( user &&  total_price && total_quantity && items && payment_id )) {
            res.status(400).send("All input is required");
          }

           const  order= await Order.create({user,  total_price, total_quantity,items,  payment_id})
          console.log({order})
          res.status(201).send({status: 'success', message:"Successfully Placed order!"})

        }catch(err){
            res.status(500).send({
                status:"failed",
                  message: "Could not Placed order."
                });
            console.log(err)
        }
}