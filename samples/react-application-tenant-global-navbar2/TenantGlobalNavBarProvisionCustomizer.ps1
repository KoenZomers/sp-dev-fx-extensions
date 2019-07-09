#Connect-PnPOnline "https://<your-tenant>.sharepoint.com/sites/<your-site>" -UseWebLogin

Add-PnPCustomAction -Title "TenantGlobalNavBarCustomAction" `
					-Name "TenantGlobalNavBarCustomAction" `
					-Location "ClientSideExtension.ApplicationCustomizer" `
					-ClientSideComponentId "b5ee6a7d-ee49-4913-b217-021fb89650d8" `
					-ClientSideComponentProperties "{""TopMenuTermSet"":""TenantGlobalNavBar"",""BottomMenuTermSet"":""TenantGlobalFooterBar""}"