/*
    Theres just two schemas. This is just one of them. The backend is really small due to the requirements.
*/

export interface Product {
    /**
     * The products unique 8 digit id [productId]
     * @example "ABCD-1234"
     * @type string
     */
    productId: string
    /**
     * The products name [title]
     * @example "Double Decker Cheeeeeeeeeeeeeeese Burgerrr"
     * @type string
     */
    title: string
    /**
     * The products price [price]
     * @example 9.99
     * @type number
     */
    price: number
    /**
     * The products description [description]
     * @example "Hey this is a realllyyyy cool cheezeburgerr you should definately purchase and waste your money on"
     * @type string
     */
    description: string
    /**
     * The products image URL [imageUri]
     * @example "https://imgur.com/daoioaejfoi.png"
     * @type string
     * @satisfies Begins with "https://""
     */
    imageUri: string
}