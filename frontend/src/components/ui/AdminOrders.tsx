import { useEffect, useState } from 'react';
import {
    PencilIcon,
    EyeIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/outline';

interface OrderItem {
    title: string;
    quantity: number;
    thumbnail: string;
    price: number;
}
interface Address {
    name: string;
    street: string;
    city: string;
    state: string;
    pinCode: string;
    phone: string;
}

interface Order {
    id: number;
    items: OrderItem[];
    totalAmount: number;
    selectedAddress: Address;
    status: string;
    paymentStatus?: string; // Assuming this field is optional
}


const orders: Order[] = [
    {
        "id": 101,
        "items": [
            {
                "title": "Apples",
                "quantity": 5,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 1.2
            },
            {
                "title": "Bananas",
                "quantity": 10,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.5
            },
            {
                "title": "Milk",
                "quantity": 10,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.5
            },
            {
                "title": "Bread",
                "quantity": 10,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.5
            }
        ],
        "totalAmount": 11,
        "selectedAddress": {
            "name": "John Doe",
            "street": "123 Apple Street",
            "city": "Springfield",
            "state": "Illinois",
            "pinCode": "62701",
            "phone": "+1 555-1234"
        },
        "status": "pending"
    },
    {
        "id": 102,
        "items": [
            {
                "title": "Oranges",
                "quantity": 8,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.8
            }
        ],
        "totalAmount": 11.4,
        "selectedAddress": {
            "name": "Jane Smith",
            "street": "456 Orange Ave",
            "city": "Miami",
            "state": "Florida",
            "pinCode": "33101",
            "phone": "+1 555-5678"
        },
        "status": "dispatched"
    },
    {
        "id": 103,
        "items": [
            {
                "title": "Tomatoes",
                "quantity": 6,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 1.0
            },
            {
                "title": "Lettuce",
                "quantity": 3,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 1.5
            },
            {
                "title": "Milk",
                "quantity": 10,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.5
            },
            {
                "title": "Eggs",
                "quantity": 10,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.5
            },
            {
                "title": "Curd",
                "quantity": 10,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.5
            }
        ],
        "totalAmount": 9.0,
        "selectedAddress": {
            "name": "Peter Parker",
            "street": "789 Tomato Lane",
            "city": "New York",
            "state": "New York",
            "pinCode": "10001",
            "phone": "+1 555-8765"
        },
        "status": "delivered"
    },
    {
        "id": 104,
        "items": [
            {
                "title": "Milk",
                "quantity": 2,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 3.5
            },
            {
                "title": "Eggs",
                "quantity": 12,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 2.0
            }
        ],
        "totalAmount": 9.0,
        "selectedAddress": {
            "name": "Bruce Wayne",
            "street": "Wayne Manor",
            "city": "Gotham",
            "state": "New Jersey",
            "pinCode": "07001",
            "phone": "+1 555-1111"
        },
        "status": "cancelled"
    },
    {
        "id": 105,
        "items": [
            {
                "title": "Potatoes",
                "quantity": 10,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.6
            }
        ],
        "totalAmount": 10.8,
        "selectedAddress": {
            "name": "Clark Kent",
            "street": "Kent Farm",
            "city": "Smallville",
            "state": "Kansas",
            "pinCode": "66002",
            "phone": "+1 555-2222"
        },
        "status": "pending"
    },
    {
        "id": 106,
        "items": [
            {
                "title": "Onions",
                "quantity": 6,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.7
            },
            {
                "title": "Garlic",
                "quantity": 2,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 1.0
            },
            {
                "title": "Bananas",
                "quantity": 10,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.5
            }
        ],
        "totalAmount": 6.2,
        "selectedAddress": {
            "name": "Diana Prince",
            "street": "Themyscira Avenue",
            "city": "Metropolis",
            "state": "Delaware",
            "pinCode": "19901",
            "phone": "+1 555-3333"
        },
        "status": "dispatched"
    },
    {
        "id": 107,
        "items": [
            {
                "title": "Bread",
                "quantity": 1,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 2.5
            },
            {
                "title": "Butter",
                "quantity": 1,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 3.0
            }
        ],
        "totalAmount": 5.5,
        "selectedAddress": {
            "name": "Barry Allen",
            "street": "Central City Blvd",
            "city": "Central City",
            "state": "Missouri",
            "pinCode": "63001",
            "phone": "+1 555-4444"
        },
        "status": "delivered"
    },
    {
        "id": 108,
        "items": [
            {
                "title": "Yogurt",
                "quantity": 3,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 1.2
            }
        ],
        "totalAmount": 7.6,
        "selectedAddress": {
            "name": "Hal Jordan",
            "street": "Green Lantern Rd",
            "city": "Coast City",
            "state": "California",
            "pinCode": "90210",
            "phone": "+1 555-5555"
        },
        "status": "pending"
    },
    {
        "id": 109,
        "items": [
            {
                "title": "Chicken Breast",
                "quantity": 2,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 5.0
            },
            {
                "title": "Spinach",
                "quantity": 3,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 1.5
            }
        ],
        "totalAmount": 8.0,
        "selectedAddress": {
            "name": "Oliver Queen",
            "street": "Starling Street",
            "city": "Star City",
            "state": "Washington",
            "pinCode": "98001",
            "phone": "+1 555-6666"
        },
        "status": "dispatched"
    },
    {
        "id": 110,
        "items": [
            {
                "title": "Rice",
                "quantity": 1,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 4.0
            },
            {
                "title": "Beans",
                "quantity": 2,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 1.0
            },
            {
                "title": "Bananas",
                "quantity": 10,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.5
            },
            {
                "title": "Apple",
                "quantity": 10,
                "thumbnail": "https://via.placeholder.com/50",
                "price": 0.5
            }
        ],
        "totalAmount": 6.0,
        "selectedAddress": {
            "name": "Arthur Curry",
            "street": "Ocean Drive",
            "city": "Atlantis",
            "state": "Georgia",
            "pinCode": "30301",
            "phone": "+1 555-7777"
        },
        "status": "delivered"
    }
]


function AdminOrders() {
    const ITEMS_PER_PAGE = 7;
    const [page, setPage] = useState<number>(1);
    const [editableOrderId, setEditableOrderId] = useState<number>(-1);
    const [sort, setSort] = useState<{ _sort?: string; _order?: string }>({});

    const handleEdit = (order: Order) => {
        setEditableOrderId(order.id);
    };

    const handleShow = (order: Order) => {
        console.log('Show details for:', order);
    };

    const handleUpdate = (e: React.ChangeEvent<HTMLSelectElement>, order: Order) => {
        setEditableOrderId(-1);
        // You can add the logic to update the order status here
    };

    const handleSort = (sortOption: { sort: string; order: string }) => {
        const sort = { _sort: sortOption.sort, _order: sortOption.order };
        setSort(sort);
    };

    const chooseColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-purple-200 text-purple-600';
            case 'delivered':
                return 'bg-green-200 text-green-600';
            case 'cancelled':
                return 'bg-red-200 text-red-600';
            default:
                return 'bg-purple-200 text-purple-600';
        }
    };

    return (
        <div className=''>
            <div className="overflow-x-auto">
                <div className="flex items-center justify-center font-sans overflow-hidden">
                    <div className="w-4/5">
                        <div className="shadow-md border rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th
                                            className="py-3 px-6 text-left cursor-pointer"
                                            onClick={() =>
                                                handleSort({
                                                    sort: 'id',
                                                    order: sort?._order === 'asc' ? 'desc' : 'asc',
                                                })
                                            }
                                        >
                                            Order# {' '}
                                            {sort._sort === 'id' &&
                                                (sort._order === 'asc' ? (
                                                    <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                                ) : (
                                                    <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                                ))}
                                        </th>
                                        <th className="py-3 px-6 text-left">Grocery Items</th>
                                        <th
                                            className="py-3 px-6 text-left cursor-pointer"
                                            onClick={() =>
                                                handleSort({
                                                    sort: 'totalAmount',
                                                    order: sort?._order === 'asc' ? 'desc' : 'asc',
                                                })
                                            }
                                        >
                                            Total Amount {' '}
                                            {sort._sort === 'totalAmount' &&
                                                (sort._order === 'asc' ? (
                                                    <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                                ) : (
                                                    <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                                ))}
                                        </th>
                                        <th className="py-3 px-6 text-center">Payment Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders.map((order) => (
                                        <tr className="border-b border-gray-200 hover:bg-gray-600" key={order.id}>
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2"></div>
                                                    <span className="text-lg text-white font-bold">{order.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {order.items.map((item, index) => (
                                                    <div className="flex items-center" key={index}>
                                                        <div className="mr-2">
                                                            <p className='text-lg text-white font-bold'>{`- ${item.title}`}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {/* <div className="flex items-center justify-center"> */}
                                                <p className='text-lg text-white text-bold'> ${order.totalAmount}</p>
                                                {/* </div> */}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {order.id === editableOrderId ? (
                                                    <select onChange={(e) => handleUpdate(e, order)}>
                                                        <option value="pending">Pending</option>
                                                        <option value="delivered">Successful</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                ) : (
                                                    <span
                                                        className={`${chooseColor(
                                                            order.status
                                                        )} py-1 px-3 rounded-full text-lg`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center text-white">
                                                    <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                                                        <EyeIcon
                                                            className="w-8 h-8"
                                                            onClick={() => handleShow(order)}
                                                        ></EyeIcon>
                                                    </div>
                                                    <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                                                        <PencilIcon
                                                            className="w-8 h-8"
                                                            onClick={() => handleEdit(order)}
                                                        ></PencilIcon>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex flex-col items-center px-5 py-5  xs:flex-row xs:justify-between">
                                <div className="flex items-center">
                                    <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                                        <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                            </path>
                                        </svg>
                                    </button>
                                    <button type="button" className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 ">
                                        1
                                    </button>
                                    <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                                        2
                                    </button>
                                    <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                                        3
                                    </button>
                                    <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                                        4
                                    </button>
                                    <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                                        <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminOrders;
