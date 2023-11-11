import SampleProductImg from "@/assets/images/sampleProduct.jpg";

export default function ProductGrid() {
  const products = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div id="product-grid" className="mx-auto max-w-7xl">
      {/* Heading */}
      <h1 className="mb-4 p-10 text-center text-4xl font-bold">
        Choose from our popular picks
      </h1>

      {/* Grid goes here */}
      <section
        id="Projects"
        className="mx-auto mb-5 mt-10 grid grid-cols-1 gap-x-10 gap-y-20 px-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {products.map((product) => (
          <div
            key={product}
            className="w-full bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl"
          >
            <a href="#">
              <img
                src={SampleProductImg}
                alt="Product"
                className="h-80 rounded-t-xl object-cover"
              />
              <div className="w-72 px-4 py-3">
                <p className="block text-lg font-bold capitalize text-black">
                  MTI 3520 High Efficiency Motor 340KV / 380KV
                </p>
                <span className="mr-3 text-xs uppercase text-gray-400">
                  M series, Motor
                </span>
                <div className="flex items-center">
                  <p className="my-3 cursor-auto text-lg font-semibold text-black">
                    <i className="nf nf-fa-rupee"></i> 2250.00
                  </p>
                  <del>
                    <p className="ml-2 cursor-auto text-sm text-gray-600">
                      <i className="nf nf-fa-rupee"></i> 5250.00
                    </p>
                  </del>
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}
