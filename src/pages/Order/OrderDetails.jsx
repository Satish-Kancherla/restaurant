import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { ChevronDown, UserCog } from "lucide-react";
import * as FormElements from "../../components/ui/FormElements";
import axios from "axios";
import { getUrl, instance } from "../../components/Url";
import { useAuthContext } from "../../contexts/AuthContext";
import { Edit } from "lucide-react";
import Button from "../../components/ui/Button";
import { v4 } from "uuid";
const OrderDetails = ({ form, statusInp = true }) => {
    const { formData, errors, changeHandle, handleSubmit, setFormData } = form;
    const [menuItems, setMenuItems] = useState([]);
    const url = getUrl();
     const [open, setOpen] = useState();
    const [dialogUrl, setDialogUrl] = useState("");
    const handleClose = () => {
        setOpen(false);
        setDialogUrl("");
    };

    // Fetch menu items from API
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await instance.get("http://localhost:5000/api/v1/menu");
                setMenuItems(response.data); // Store the menu items in state
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems();
    }, []);

    return (
        <div className="container mx-auto employee-details  ">
            <div className="employee-form">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    {statusInp && (
                        <FormElements.Select
                            label={
                                <span>
                                    Category <span className="text-red-500">*</span>
                                </span>
                            }
                            optionsArray={[
                                { id: "", title: "Select an Option" },
                                { value: "Veg", title: "Veg" },
                                { value: "NonVeg", title: "NonVeg" },
                            ]}
                            name="category"
                            value={formData.category}
                            onChange={changeHandle}
                            error={errors.category}
                        />
                    )}
                    {/* <div className="flex items-center gap-2"> */}

                    {/* Dynamically populate the Item Name field with menu items */}
                    <FormElements.Select
                        label={
                            <span>
                                Item Name <span className="text-red-500">*</span>
                            </span>
                        }
                        optionsArray={[
                            { id: "", title: "Select an Item" },
                            ...menuItems.map((item) => ({
                                value: item.itemname,
                                title: item.itemname,
                            })),
                        ]}
                        name="itemname"
                        value={formData.itemname}
                        onChange={changeHandle}
                        error={errors.itemname}
                    />

                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label={
                            <span>
                                Notes <span className="text-red-500">*</span>
                            </span>
                        }
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={changeHandle}
                        error={errors.notes}
                    />
                    <FormElements.Input
                        label={
                            <span>
                                Quantity <span className="text-red-500">*</span>
                            </span>
                        }
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={changeHandle}
                        error={errors.quantity}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label={
                            <span>
                                Unit Price <span className="text-red-500">*</span>
                            </span>
                        }
                        type="number"
                        name="unitprice"
                        value={formData.unitprice}
                        onChange={changeHandle}
                        error={errors.unitprice}
                    />
                    <FormElements.Input
                        label={
                            <span>
                                Total <span className="text-red-500">*</span>
                            </span>
                        }
                        type="number"
                        name="total"
                        value={formData.total}
                        onChange={changeHandle}
                        error={errors.total}
                    />
                </div>
            </div>
        </div>
    );
};
export default OrderDetails;
