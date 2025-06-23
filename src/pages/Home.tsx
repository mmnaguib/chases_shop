import { useEffect, useState } from "react";
import DshaboardApi from "../Api/DashbaordApi";
import InvoiceChart from "../components/Chart";

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

  const [getTopProductsValues, setGetTopProductsValues] = useState<
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
  }>({
    totalFinalPrice: 0,
    totalPaid: 0,
    totalProfit: 0,
    totalQuantity: 0,
    totalRemaining: 0,
    totalRevenue: 0,
    netProfit: 0,
    adminExpenses: 0,
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
    <div className="homeDashboard">
      <div className="card">
        <h5>العملاء</h5>
        <span>{clientsCount.count}</span>
      </div>
      <div className="card">
        <h5>الموردين</h5>
        <span>{suppliersCount.count}</span>
      </div>
      <div className="card">
        <h5>فواتير الشراء</h5>
        <span>{buyingsInvoiceCount.count}</span>
      </div>
      <div className="card">
        <h5>فواتير البيع </h5>
        <span>{sellingsInvoiceCount.count}</span>
      </div>

      <div className="card">
        <h5>المصاريف الادارية </h5>
        <span>{solded.adminExpenses}</span>
      </div>

      <div className="card">
        <h5>اجمالي المدفوع </h5>
        <span>{solded.totalRevenue}</span>
      </div>

      <div className="card">
        <h5>اجمالي المبيعات </h5>
        <span>{solded.totalFinalPrice}</span>
      </div>

      <div className="card">
        <h5>اجمالي الكمية المباعة </h5>
        <span>{solded.totalQuantity}</span>
      </div>

      <div className="card">
        <h5>اجمالي المبالغ المتبقية </h5>
        <span>{solded.totalRemaining}</span>
      </div>

      <div className="card">
        <h5>مجموع المبيعات - المشتريات (الربح) </h5>
        <span>{solded.netProfit}</span>
      </div>
      <div className="card">
        <h5>الاعلي مبيعاَ </h5>
        {getTopProductsValues.map((product) => (
          <>
            <div>{product.name} </div>
            <div>{product.soldQuantity}</div>
            <div>{product.remainingQuantity}</div>
          </>
        ))}
      </div>

      <InvoiceChart data={getTopProductsValues} />
    </div>
  );
};

export default Home;
