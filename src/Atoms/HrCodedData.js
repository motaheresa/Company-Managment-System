import apiAuth from "./apiAuth";
export const HrCodedData = async () => {
    const token = localStorage.getItem("token")

    const response = await fetch("http://localhost:3005/hr/coded", apiAuth(token));
    const data = await response.json();
    if (data.status == "Success") {
        return {
            sector: data.data.sectors,
            site: data.data.sites,
            branche: data.data.branches,
            department: data.data.departments,
            jobPost: data.data.jobPosts,
            company:data.data.company,
        }
    } else {
        console.log("Error! in HrCodedData.js file")
    }
}

