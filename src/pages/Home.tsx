import { useEffect, useState } from "react";
import DshaboardApi from "../Api/DashbaordApi";
import {
  faUsers,
  faTruck,
  faFileInvoice,
  faFileInvoiceDollar,
  faCashRegister,
  faShoppingCart,
  faArrowDown,
  faArrowUp,
  faWallet,
  faMoneyBillWave,
  faChartLine,
  faFileAlt,
  faBoxes,
  faTruckLoading,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Home = () => {
  const [clientsCount, setClientsCount] = useState<{
    type: string;
    count: number;
  }>({ type: "", count: 0 });
  const [suppliersCount, setSuppliersCount] = useState<{
    type: string;
    count: number;
  }>({ type: "", count: 0 });

  const [buyingsInvoiceCount, setBuyingsInvoiceCount] = useState<{
    type: string;
    count: number;
  }>({ type: "", count: 0 });
  const [sellingsInvoiceCount, setSellingsCount] = useState<{
    type: string;
    count: number;
  }>({ type: "", count: 0 });

  const [, setGetTopProductsValues] = useState<
    {
      name: string;
      soldQuantity: number;
      remainingQuantity: number;
    }[]
  >([]);
  const [solded, setSolded] = useState<{
    totalFinalPrice: number;
    totalPaid: number;
    totalProfit: number;
    totalQuantity: number;
    totalRemaining: number;
    totalRevenue: number;
    netProfit: number;
    adminExpenses: number;
    topProducts: { name: string; quantity: number }[];
    purchasedProducts: { name: string; quantity: number }[];
    totalPurchasedQuantity: number;
    totalPurchases: number;
    totalPurchaseRemaining: number;
    totalPurchaseCost: number;
  }>({
    totalFinalPrice: 0,
    totalPaid: 0,
    totalProfit: 0,
    totalQuantity: 0,
    totalRemaining: 0,
    totalRevenue: 0,
    netProfit: 0,
    adminExpenses: 0,
    topProducts: [],
    purchasedProducts: [],
    totalPurchasedQuantity: 0,
    totalPurchases: 0,
    totalPurchaseRemaining: 0,
    totalPurchaseCost: 0,
  });

  const getClientsCount = async () => {
    const res = await DshaboardApi.getUsersCount("C");
    setClientsCount(res.data);
  };
  const getsuppliersCount = async () => {
    const res = await DshaboardApi.getUsersCount("S");
    setSuppliersCount(res.data);
  };

  const getBuyingInvoicesCount = async () => {
    const res = await DshaboardApi.getInvoicesCount("P");
    setBuyingsInvoiceCount(res.data);
  };
  const getSellingInvoiceCount = async () => {
    const res = await DshaboardApi.getInvoicesCount("S");
    setSellingsCount(res.data);
  };

  const getAllNumbers = async () => {
    const res = await DshaboardApi.getTotalSoldQunatity();
    setSolded(res.data);
  };
  const getTopProducts = async () => {
    const res = await DshaboardApi.getTopProducts();
    setGetTopProductsValues(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getClientsCount();
    getsuppliersCount();
    getBuyingInvoicesCount();
    getSellingInvoiceCount();
    getAllNumbers();
    getTopProducts();
  }, []);
  return (
    <>
      <h1 className="pageHeader ">لوحة التحكم</h1>
      <div className="homeDashboard">
        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
          </div>
          <h5>فواتير البيع </h5>
          <span>{sellingsInvoiceCount.count}</span>
        </div>

        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faCashRegister} />
          </div>
          <h5>اجمالي المبيعات </h5>
          <span>{solded.totalRevenue}</span>
        </div>

        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
          <h5>اجمالي المدفوع ليا</h5>
          <span>{solded.totalPaid}</span>
        </div>

        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faMoneyBillWave} />
          </div>
          <h5>الاجمالي ليا</h5>
          <span>{solded.totalRemaining}</span>
        </div>

        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faBoxes} />
          </div>
          <h5>الكمية المباعة {solded.totalQuantity}</h5>
          <>
            {solded.topProducts.map((product) => (
              <div key={product.name}>
                {product.name} : {product.quantity}
              </div>
            ))}
          </>
        </div>
        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faFileInvoice} />
          </div>
          <h5>فواتير الشراء</h5>
          <span>{buyingsInvoiceCount.count}</span>
        </div>
        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <h5>اجمالي المشتريات </h5>
          <span>{solded.totalPurchaseCost}</span>
        </div>

        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <h5>اجمالي المدفوع مني</h5>
          <span>
            {solded.totalPurchaseCost - solded.totalPurchaseRemaining}
          </span>
        </div>

        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faWallet} />
          </div>
          <h5>الاجمالي عليا</h5>
          <span>{solded.totalPurchaseRemaining}</span>
        </div>
        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faTruckLoading} />
          </div>
          <h5>الكمية المشتراه {solded.totalPurchasedQuantity}</h5>
          <>
            {solded.purchasedProducts.map((product) => (
              <div key={product.name}>
                {product.name} : {product.quantity}
              </div>
            ))}
          </>
        </div>

        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faFileAlt} />
          </div>
          <h5>المصاريف الادارية </h5>
          <span>{solded.adminExpenses}</span>
        </div>

        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <h5>الربح </h5>
          <span>{solded.netProfit}</span>
        </div>

        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <h5>العملاء</h5>
          <span>{clientsCount.count}</span>
        </div>
        <div className="dashboard-card">
          <div className="icon">
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <h5>الموردين</h5>
          <span>{suppliersCount.count}</span>
        </div>
        {/* <div className="dashboard-card">
        <div className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </div><h5>الاعلي مبيعاَ </h5>
        {getTopProductsValues.map((product) => (
          <>
            <div>{product.name} </div>
            <div>{product.soldQuantity}</div>
            <div>{product.remainingQuantity}</div>
          </>
        ))}
      </div> */}

        {/* <InvoiceChart data={getTopProductsValues} /> */}
      </div>
    </>
  );
};

export default Home;
