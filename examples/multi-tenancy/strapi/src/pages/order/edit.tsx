import { useContext } from "react";
import {
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
    useSelect,
    Select,
    InputNumber,
    HttpError,
    Edit,
} from "@pankod/refine";

import { IOrder, IProduct } from "interfaces";
import { StoreContext } from "context/store";

export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
    const [store] = useContext(StoreContext);
    const { formProps, saveButtonProps, queryResult } = useForm<
        IOrder,
        HttpError,
        IOrder
    >({
        metaData: { populate: "product" },
    });

    const productData = queryResult?.data?.data;

    const { selectProps: productSelectProps } = useSelect<IProduct>({
        resource: "products",
        defaultValue: productData?.product?.data?.id,
        optionLabel: "title",
        optionValue: "id",
        filters: [{ field: "stores][id]", operator: "eq", value: store }],
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
                onFinish={(values) => {
                    console.log(values);
                    return formProps.onFinish?.({
                        ...values,
                        product: values.product?.data,
                    });
                }}
            >
                <Form.Item
                    label="Product"
                    name={["product", "data", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...productSelectProps} />
                </Form.Item>
                <Form.Item label="Quantity" name="quantity">
                    <InputNumber defaultValue={1} />
                </Form.Item>

                <Form.Item label="Status" name="status">
                    <Select
                        options={[
                            {
                                label: "Not Delivered",
                                value: "not delivered",
                            },
                            {
                                label: "Delivered",
                                value: "delivered",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Customer Name" name="customerName">
                    <Input />
                </Form.Item>
                <Form.Item label="Customer Address" name="customerAddress">
                    <Input size="large" />
                </Form.Item>
            </Form>
        </Edit>
    );
};
